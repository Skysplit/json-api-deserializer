module.exports = {
  data: [
    {
      type: 'posts',
      id: 1,
      attributes: {
        name: 'foo',
      },
      relationships: {
        author: {
          data: {
            type: 'users',
            id: 1,
          },
        },
        comments: {
          data: [
            {
              type: 'comments',
              id: 1
            },
            {
              type: 'comments',
              id: 2,
            },
            {
              type: 'comments',
              id: 3
            },
          ],
        },
      },
    },
    {
      type: 'posts',
      id: 2,
      attributes: {
        name: 'bar',
      },
      relationships: {
        author: {
          data: {
            type: 'users',
            id: 1,
          },
        },
        comments: {
          data: [
            {
              type: 'comments',
              id: 1
            }, {
              type: 'comments',
              id: 2,
            }, {
              type: 'comments',
              id: 3
            },
          ],
        },
      },
    },
  ],
  included: [
    {
      type: 'users',
      id: 1,
      attributes: {
        name: 'John',
      },
    },
    {
      type: 'users',
      id: 2,
      attributes: {
        name: 'Jane'
      },
    },
    {
      type: 'comments',
      id: 1,
      attributes: {
        content: 'lorem',
      },
      relationships: {
        author: {
          data: {
            type: 'users',
            id: 1,
          },
        },
      },
    },
    {
      type: 'comments',
      id: 2,
      attributes: {
        content: 'ipsum',
      },
      relationships: {
        author: {
          data: {
            type: 'users',
            id: 2,
          },
        },
      },
    },
    {
      type: 'comments',
      id: 3,
      attributes: {
        content: 'dolor',
      },
      relationships: {
        author: {
          data: {
            type: 'users',
            id: 2,
          },
        },
      },
    },
  ],
}
