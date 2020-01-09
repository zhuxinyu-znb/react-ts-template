const mock = {

    // 接口类型及路径之间，需要有一个空格，接口可定义为方法或者数据，

    'POST /webpackmocker': (req, res) => {

        // server 控制台会打印请求的参数内容

        // 取到请求体，可以进一步做一些处理操作

        console.log(req.body);

        // 模拟延迟

        setTimeout(() => {
            res.send(
                {

                    code: '1', data: {

                        'status': Math.random() * 100,

                        message: '删除成功'

                    }

                }

            );
        }, 1000);
    },
    'POST /webpackmocker2': {
        code: '1', data:

            { 'status': 20, message: '删除成功' }

    },

};
module.exports = mock;