## 文章后台管理系统

安装依赖 

npm install --save sequelize

npm install --save mysql2



npm install  dotenv		环境变量库

在项目根目录下新建 .env文件  文件中配置环境变量 如数据库名称 用户信息等

在app.js中读取环境变量  require('dotenv').config()



npm install md5		数据加密库  将用户密码加密

npm install jsonwebtoken	响应头设置 token

npm install express-jwt		对客户端出过来的 token进行验证

npm install express-async-errors		捕获异步错误



**routes**：表示层

**service**：业务逻辑层

**dao**：数据访问层

**public**：静态文件目录



**router	>>>	service	>>>	model**

token 的生成 使用 jsonwebtoken中的 sign方法 接收三个参数，data,secret，expiresIn

`const token = jwt.sign(data,md5(secret),{expiresIn:1000})`

token 的解析 使用 jsonwebtoken中的 verify方法 接收两个参数 token，secret

`jwt.verify(token,md5(secret))`

### 接口

1. 管理员

   | 接口名称       | 接口路径                      |
   | -------------- | ----------------------------- |
   | 登录           | **POST**   /api/admin/login   |
   | 更新管理员信息 | **PUT**     /api/admin        |
   | 恢复登录状态   | **GET**     /api/admin/whoami |

   



