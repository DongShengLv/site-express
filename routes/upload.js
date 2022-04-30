// 上传图片路由
let express = require('express');
let router = express.Router();
const multer = require('multer');
const { UploadError } = require('../utils/errors');
const { uploading, formatResponse } = require('../utils/tool');



// 上传图片
router.post('/', function (req, res, next) {
  // single方法里写入上传控件的 name 值
  const upload = uploading.single('file');
  // 自定义错误处理
  upload(req, res, function (err) {
    if(err instanceof multer.MulterError){
      // 上传文件出错
      next(new UploadError('上传文件失败，请检查文件大小，控制在 2MB 以内'));
    } else {
      // 上传成功
      // 文件名
      const path = '/static/uploads/' + req.file.filename;
      
      res.send(formatResponse(200,'success',path));
    }
  })
})

module.exports = router;
