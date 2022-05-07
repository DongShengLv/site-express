// 工具函数
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const multer = require('multer');
const path = require('path');
const toc = require('markdown-toc');
const fs = require('fs');
const { UnknownError } = require('./errors');

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
    let basename = path.basename(file.originalname, path.extname(file.originalname));
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

// 处理 TOC 目录 （根据客户端传来的数据中的 markdown数据生成 TOC 目录）
module.exports.handleTOC = function (info) {
  // 将文章中的 markdown格式数据转换成数组
  let result = toc(info.markdownContent).json();
  // 将 TOC目录进行格式转换
  info.toc = transfer(result);
  // 将 markdown格式数据删除 
  delete info.markdownContent;

  // 为 toc目录的每一项标题加上 id
  for (const i of result) {
    switch (i.lvl) {
      case 1: {
        let newStr = `<h1 id='${i.slug}'>`;
        info.htmlContent = info.htmlContent.replace('<h1>', newStr);
        break;
      }
      case 2: {
        let newStr = `<h2 id='${i.slug}'>`;
        info.htmlContent = info.htmlContent.replace('<h2>', newStr);
        break;
      }
      case 3: {
        let newStr = `<h3 id='${i.slug}'>`;
        info.htmlContent = info.htmlContent.replace('<h3>', newStr);
        break;
      }
      case 4: {
        let newStr = `<h4 id='${i.slug}'>`;
        info.htmlContent = info.htmlContent.replace('<h4>', newStr);
        break;
      }
      case 5: {
        let newStr = `<h5 id='${i.slug}'>`;
        info.htmlContent = info.htmlContent.replace('<h5>', newStr);
        break;
      }
      case 6: {
        let newStr = `<h6 id='${i.slug}'>`;
        info.htmlContent = info.htmlContent.replace('<h6>', newStr);
        break;
      }
    }
  }

  return info;
}

 // 辅助函数 将平面数组转换成多维数组
 function transfer(flatArr) {
  let stack = []; //  模拟栈的结构
  let result = []; //  最终返回的数组
  let min = 6; // 文章标题最小的级别

  // 辅助函数 接收一个对象 将该对象转换成自定义的格式
  function createTOCItem(item) {
    return {
      name: item.content,
      anchor: item.slug,
      level: item.lvl,
      children: []
    }
  }

  //  辅助函数
  function handleItem(item) {
    let top = stack[stack.length - 1]; // 取出 stack数组中最后一项
    if (!top) {
      stack.push(item);
    } else if (item.level > top.level) {
      // 如果 当前 toc对象中的标题等级比上一个的要大 说明该 toc应该为上一个 toc的 children
      top.children.push(item);
      stack.push(item);
    } else {
      stack.pop();
      handleItem(item); //  递归
    }
  }

  // 寻找最小的标题级别
  for (const i of flatArr) {
    if (i.lvl < min) {
      min = i.lvl;
    }
  }

  for (const item of flatArr) {
    // 创建 toc对象
    const tocItem = createTOCItem(item);
    if (tocItem.level === min) {
      // 当前 toc 对象的标题等级是最高等级 不会作为其他 toc对象的 children
      result.push(tocItem);
    }
    // 目前的 toc对象可能是其他 toc对象 children中的一员 特殊处理
    handleItem(tocItem);
  }

  return result;
}

// 读取存放头像目录下的文件数量
module.exports.readDirLength = function (dir) {
  return new Promise((resolve,reject) => {
    fs.readdir(dir, (err, files) => {
      if(err) reject(err);
      resolve(files)
    })
  })
}