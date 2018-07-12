const normalizeToArray = (list) => {
  return Array.isArray(list) ? list : [list];
};

const getResource = (resources, type, id) => {
  return (resources[type] || {})[id];
};

const parseResources = (list) => {
  const resources = {};

  if (! list) {
    return resources;
  }

  for (const resource of normalizeToArray(list)) {
    const { type, id, attributes } = resource;

    resources[type] = resources[type] || {};
    resources[type][id] = Object.assign({ id, type }, attributes);
  }

  return resources;
};

const mapRelationsToResources = (list, resources) =>
  normalizeToArray(list).map(
    ({ id, type, relationships = {} }) => injectRelations(id, type, resources, relationships)
  );

const injectRelations = (id, type, resources, relationships = {}) => {
  return Object.keys(relationships).map((name) => {
    const { data } = relationships[name];
    
    // Skip if there is no data field
    if (!data) {
      return;
    }
    
    let relation;

    if (Array.isArray(data)) {
      relation = data.map((data) => getResource(resources, data.type, data.id));
    } else {
      relation = getResource(resources, data.type, data.id);
    }

    resources[type][id][name] = relation;

    return getResource(resources, type, id);
  });
};

module.exports = ({ data, included = [] }) => {
  if (!data) {
    return;
  }

  const resources = Object.assign(
    {},
    parseResources(included),
    parseResources(data)
  );

  mapRelationsToResources(included, resources),
  mapRelationsToResources(data, resources);

  if (Array.isArray(data)) {
    return data.map(({ type, id }) => getResource(resources, type, id));
  } else {
    return getResource(resources, data.type, data.id);
  }
};
