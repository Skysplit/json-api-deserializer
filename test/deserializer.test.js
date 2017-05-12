const { expect } = require('chai');
const deserialize = require('../');
const { deepNested, circular } = require('./fixtures')

describe('#deserializer', function () {
  it('should handle circular dependecies', function () {
    const json = deserialize(circular);
    expect(json).to.have.lengthOf(1);

    const post = json[0];
    expect(post.id).to.eql(1);

    expect(post.comments).to.exist;
    expect(post.comments).to.have.lengthOf(1);
    expect(post.comments[0].author).to.exist;
  });

  it('should properly deserialize nested resources', function () {
    const json = deserialize(deepNested);
    expect(json).to.have.lengthOf(2);

    const [first, second] = json;
    expect(first.id).to.eql(1);
    expect(second.id).to.eql(2);

    expect(first.comments).to.eql(second.comments);
    expect(first.comments).to.have.lengthOf(3);
    expect(first.comments[0].author).to.eql(first.author);
    expect(first.comments[1].author).to.eql(first.comments[2].author);
    expect(first.comments[1].id).to.not.eql(first.comments[2].id);
  });
})
