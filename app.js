var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {expressjwt} = require("express-jwt");
const md5 = require('md5');
const { ForBiddenError, ServiceError,UnknownError } = require('./utils/errors');



// 读取环境变量
require('dotenv').config();

// 捕获异步错误
// require('express-async-errors');

// 引入数据库连接
require("./dao/db");


// 引入路由
let adminRouter = require('./routes/admin');

// 创建服务器实例
var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 配置验证 token 接口
app.use(expressjwt({
  secret:md5(process.env.JWT_SECRET), // 密钥
  algorithms:['HS256']    // 算法
}).unless({
  // 需要排除不需要 token的路由
  path:[
    {'url':'/api/admin/login',methods:['POST']}
  ]
}))


// 使用路由中间件
app.use('/api/admin',adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误处理
app.use(function(err, req, res, next) {
  if(err.name = 'UnauthorizedError'){
    // token 无效 抛出错误
    res.send(new ForBiddenError('invalid token').toResponseJSON());
  }else if(err instanceof ServiceError){
    // 如果是抛出的自定义错误
    res.send(err.toResponseJSON());
  }else{
    res.send(new UnknownError().toResponseJSON());
  }
});

module.exports = app;
