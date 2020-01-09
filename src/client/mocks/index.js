const mock = require('./demo/mock'); // 引入模块mock的接口
const mock2 = require('./demo/mock2'); // 引入模块mock2的接口
const map = require('./map/getOrgTask');


// 当接口模块和后端同时存在接口时，模拟的接口优先生效，实际

// 对接时将config 设置为 ‘pro’

const config = 'dev'; // dev '开发环境' pro '生产环境'
const proxy = config === 'dev'
    ? {
        ...mock,
        ...mock2,
        ...map
    }
    : {};
module.exports = proxy;