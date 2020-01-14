const mock = {
  "POST /getMenu": {
    code: "1",
    data: [
      {
        title: 'demo1',
        id: 'demo1',
        path: '/report'
      }, {
        title: 'demo2',
        id: 'demo2',
        path: '/login'
      }, {
        title: 'demo3',
        id: 'demo1',
        children: [
          {
            title: 'child1',
            id: 'child1',
            path: '/demo/demo1'
          }, {
            title: 'child2',
            id: 'child2',
            path: '/demo/demo2'
          },
        ]
      },
    ]
  }
};
module.exports = mock;
