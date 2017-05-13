module.exports = {
  data: [
    {
      type: 'posts',
      id: 1,
      attributes: {
        content: 'lorem ipsum'
      },
      relationships: {
        comments: {
          data: [{
            type: 'comments',
            id: 1
          }, ],
        },
      },
    },
  ],
  included: [
    {
      type: 'comments',
      id: 1,
      attributes: {
        content: 'foo'
      },
      relationships: {
        author: {
          data: {
            type: 'users',
            id: 1
          },
        },
      },
    },
    {
      type: 'users',
      id: 1,
      attributes: {
        name: 'John',
      },
      relationships: {
        avatar: {
          data: {
            type: 'avatars',
            id: 1
          }
        }
      }
    },
    {
      type: 'avatars',
      id: 1,
      attributes: {
        image: 'image-url'
      }
    }
  ],
};