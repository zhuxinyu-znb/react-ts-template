const mock = {
  "POST /getMenu": {
    code: "1",
    data: [
      {
        title: 'demo1',
        id: 'demo1'
      }, {
        title: 'demo2',
        id: 'demo2'
      }, {
        title: 'demo3',
        id: 'demo1',
        children: [
          {
            title: 'child1',
            id: 'child1'
          }, {
            title: 'child2',
            id: 'child2'
          },
        ]
      },
    ]
  }
};
module.exports = mock;
