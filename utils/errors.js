// 自定义错误处理中间件
const { formatResponse } = require('./tool');
/**
 * 业务处理错误基类
 * 
 * @param message 错误消息
 * @param code  错误消息码
 */
class ServiceError extends Error{
  constructor(message,code){
    super(message);
    this.code = code;
  }

  // 格式化返回错误信息
  toResponseJSON(){
    return formatResponse(this.code,this.message,null);
  }
}

// 文件上传错误
exports.UploadError = class extends ServiceError{
  constructor(message){
    super(message,413);
  }
}

// 禁止访问错误
exports.ForBiddenError = class extends ServiceError{
  constructor(message){
    super(message,401);
  }
}

// 验证错误
exports.ValidationError = class extends ServiceError{
  constructor(message){
    super(message,406);
  }
}

// 无资源错误 404
exports.NotFoundError = class extends ServiceError{
  constructor(){
    super('not found',404);
  }
}

// 未知错误
exports.UnknownError = class extends ServiceError{
  constructor(){
    super('server internal error',500);
  }
}

module.exports.ServiceError = ServiceError;