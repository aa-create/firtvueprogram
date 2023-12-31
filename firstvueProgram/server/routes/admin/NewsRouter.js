/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
var express = require('express');
const NewsController = require('../../controllers/admin/NewsController');
var NewsRouter = express.Router();

const multer  = require('multer')
const upload = multer({ dest: 'public/newsuploads/' })

//涉及文件上传, 普通post不行, 需要加上 multer中间件
NewsRouter.post("/adminapi/news/add",upload.single("file"),NewsController.add)
NewsRouter.post("/adminapi/news/list",upload.single("file"),NewsController.updateList)
NewsRouter.get("/adminapi/news/list",NewsController.getList)
NewsRouter.get("/adminapi/news/list/:id",NewsController.getList)
NewsRouter.put("/adminapi/news/publish",NewsController.publish)
NewsRouter.delete("/adminapi/news/list/:id",NewsController.delNew)


module.exports = NewsRouter
