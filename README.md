## 文章后台管理系统

安装依赖

npm install --save sequelize

npm install --save mysql2

npm install dotenv 环境变量库

在项目根目录下新建 .env 文件 文件中配置环境变量 如数据库名称 用户信息等

在 app.js 中读取环境变量 require('dotenv').config()

npm install md5 数据加密库 将用户密码加密

npm install jsonwebtoken 响应头设置 token

npm install express-jwt 对客户端出过来的 token 进行验证

npm install express-async-errors 捕获异步错误

npm install svg-captcha 生成验证码

npm install express-session session 存储

npm install multer   上传图片

**routes**：表示层

**service**：业务逻辑层

**dao**：数据访问层

**public**：静态文件目录

**router >>> service >>> model**

token 的生成 使用 jsonwebtoken 中的 sign 方法 接收三个参数，data,secret，expiresIn

`const token = jwt.sign(data,md5(secret),{expiresIn:1000})`

token 的解析 使用 jsonwebtoken 中的 verify 方法 接收两个参数 token，secret

`jwt.verify(token,md5(secret))`

### 接口

1. 管理员

   | 接口名称       | 接口路径                  |
   | -------------- | ------------------------- |
   | 登录           | **POST** /api/admin/login |
   | 更新管理员信息 | **PUT** /api/admin        |
   | 恢复登录状态   | **GET** /api/admin/whoami |

2. 验证码

   | 接口名称       | 接口路径                  |
   | -------------- | ------------------------- |
   | 获取验证码          | **GET** /res/captcha |

3. 首页标语  

   | 接口名称 | 接口路径 |
   | -------------- | ----------------------------- |
   | 获取首页标语 | **GET** /api/banner |
   | 设置标语 | **POST** /api/banner |

4. 上传图片
   | 接口名称       | 接口路径                  |
   | -------------- | ------------------------- |
   | 上传图片           | **POST** /api/upload |
