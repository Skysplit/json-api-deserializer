const { expect } = require('chai');
const deserialize = require('../');
const { threeLevel, fourLevel, circular, singleResource } = require('./fixtures')

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

  it('should properly deserialize 3-level nested resources', function () {
    const json = deserialize(threeLevel);
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

  it('should properly deserialize 4-level nested resources', function () {
    const json = deserialize(fourLevel);
    expect(json).to.have.lengthOf(1);

    const post = json[0];
    expect(post.id).to.eql(1);
    expect(post.comments).to.have.lengthOf(1);

    const comment = post.comments[0];
    expect(comment.id).to.eql(1);
    expect(comment.author).to.exist;
    expect(comment.author.avatar).to.exist;
  });

  it('should properly deserialize single object', function () {
    const json = deserialize(singleResource);
    expect(json).to.exist;
    expect(json.id).to.eql(1);
    expect(json.type).to.eql('posts');
    expect(json.content).to.eql('lorem ipsum');
    expect(json.author).to.exist;
    expect(json.author.name).to.eql('John');
  });
});
