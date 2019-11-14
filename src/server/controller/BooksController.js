const Books = require('../models/Books');

class BookController{
    actionIndex() {
        const $model = new Books();
        const result = $model.getList();
        // 渲染页面
    }
    actionCreate() {

    }
}

module.exports = BookController;