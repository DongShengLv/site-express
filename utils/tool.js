// 工具函数
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const multer = require('multer');
const path = require('path');

// 格式化响应数据
module.exports.formatResponse = function (code, msg, data) {
  return {
    "code": code,
    "message": msg,
    "data": data
  }
}

// 解析 token
module.exports.analysisToken = function (token) {
  return jwt.verify(token.split(' ')[1], md5(process.env.JWT_SECRET));
}

// 处理数组类型的响应数据
module.exports.handleDataPattern = function (data) {
  const arr = [];
  for (const i of data) {
    arr.push(i.dataValues);
  }
  return arr;
}

// 上传功能
// 设置上传文件的引擎
const storage = multer.diskStorage({
  // 文件存储的位置
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../public/static/uploads');
  },
  // 上传到服务器的文件，文件名做单独处理
  filename: function (req, file, cb) {
    // 获取文件名
    let basename = path.basename(file.originalname,path.extname(file.originalname));
    // 获取后缀名
    let extname = path.extname(file.originalname);
    // 创建新的文件名
    let newName = basename + new Date().getTime() + Math.floor(Math.random() * 9000 + 1000) + extname;
    cb(null, newName);
  }
})

module.exports.uploading = multer({
  storage: storage,
  limits: {
    fileSize: 2000000, // 2MB
    files: 1
  }
});