const Mock = require('mockjs');

const mock2 = {

    // status 结果每次请求随机得到1-30

    'POST /webpackmocker3': (req, res) => {
        console.log(req.body);
        setTimeout(() => {
            res.send(
                Mock.mock(
                    {

                        code: '1',

                        data: {

                            'status|1-30': 1,

                            message: '删除成功'

                        }

                    }

                ));
        }, 1000);
    },

    // 直接定义成数据每次取到的是同一数据

    'POST /webpackmocker4': Mock.mock(
        {

            code: '1',

            data: {

                'status|30-40': 1,

                message: '删除成功'

            }

        }

    ),
};
module.exports = mock2;