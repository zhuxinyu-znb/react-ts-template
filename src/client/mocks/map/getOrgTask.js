
const mock = {

    // 接口类型及路径之间，需要有一个空格，接口可定义为方法或者数据，

    'POST /track/getOrgTask': (req, res) => {
        // server 控制台会打印请求的参数内容
        // 取到请求体，可以进一步做一些处理操作
        console.log(req.body);
        // 模拟延迟
        setTimeout(() => {
            res.send(
                {
                    "code": 0,
                    "data": [
                        {
                            "orgcode": "3701",
                            "orgname": "济南市",
                            "allnum": "50"
                        },{
                            "orgcode": "3701",
                            "orgname": "威海市",
                            "allnum": "10"
                        }/* ,{
                            "orgcode": "3701",
                            "orgname": "烟台市",
                            "allnum": "40"
                        },{
                            "orgcode": "3701",
                            "orgname": "青岛市",
                            "allnum": "10"
                        },{
                            "orgcode": "3701",
                            "orgname": "泰安市",
                            "allnum": "20"
                        },{
                            "orgcode": "3701",
                            "orgname": "枣庄市",
                            "allnum": "30"
                        },{
                            "orgcode": "3701",
                            "orgname": "淄博市",
                            "allnum": "24"
                        },{
                            "orgcode": "3701",
                            "orgname": "潍坊市",
                            "allnum": "24"
                        },{
                            "orgcode": "3701",
                            "orgname": "临沂市",
                            "allnum": "21"
                        },{
                            "orgcode": "3701",
                            "orgname": "东营市",
                            "allnum": "19"
                        },{
                            "orgcode": "3701",
                            "orgname": "济宁市",
                            "allnum": "12"
                        },{
                            "orgcode": "3701",
                            "orgname": "德州市",
                            "allnum": "32"
                        },{
                            "orgcode": "3701",
                            "orgname": "菏泽市",
                            "allnum": "5"
                        },{
                            "orgcode": "3701",
                            "orgname": "聊城市",
                            "allnum": "16"
                        },{
                            "orgcode": "3701",
                            "orgname": "滨州市",
                            "allnum": "22"
                        },{
                            "orgcode": "3701",
                            "orgname": "日照市",
                            "allnum": "32"
                        } */
                    ]
                }

            );
        }, 0);
    },
};
module.exports = mock;