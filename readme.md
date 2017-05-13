# JSON API Deserializer

[![Build Status](https://travis-ci.org/Skysplit/json-api-deserializer.svg?branch=master)](https://travis-ci.org/Skysplit/json-api-deserializer)

## Usage

```js
const deserialize = require('json-api-deserializer');

const jsonApiData = {
  data: [
    {
      type: 'users',
      id: 1,
      attributes: {
        first_name: 'John',
        last_name: 'Doe'
      }
    }
  ]
};

deserialize(jsonApiData);
// Output:
// [
//   {
//     id: 1,
//     first_name: 'John',
//     last_name: 'Doe'
//   }
// ]
```


Features

- Nested relationships
- Circular dependencies