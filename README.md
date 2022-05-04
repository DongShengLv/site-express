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

npm install multer 上传图片

npm install validate.js 数据验证

npm install markdown-toc 根据 markdown 格式的数据生成 toc 目录

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

   | 接口名称   | 接口路径             |
   | ---------- | -------------------- |
   | 获取验证码 | **GET** /res/captcha |

3. 首页标语

   | 接口名称     | 接口路径             |
   | ------------ | -------------------- |
   | 获取首页标语 | **GET** /api/banner  |
   | 设置标语     | **POST** /api/banner |

4. 上传图片

   | 接口名称 | 接口路径             |
   | -------- | -------------------- |
   | 上传图片 | **POST** /api/upload |

5. 文章分类

   | 接口名称     | 接口路径                     |
   | ------------ | ---------------------------- |
   | 添加分类     | **POST** /api/blogtype       |
   | 获取一个分类 | **GET** /api/blogtype/:id    |
   | 删除分类     | **DELETE** /api/blogtype/:id |
   | 修改分类     | **PUT** /api/blogtype/:id    |
   | 获取文章分类 | **GET** /api/blogtype        |

6. 文章

   | 接口名称     | 接口路径                 |
   | ------------ | ------------------------ |
   | 发布文章     | **POST** /api/blog       |
   | 修改文章     | **PUT** /api/blog/:id    |
   | 删除文章     | **DELETE** /api/blog/:id |
   | 分页获取文章 | **GET** /api/blog        |
   | 获取单篇文章 | **GET** /api/blog/:id    |

7. 项目&demo

   | 接口名称     | 接口路径                    |
   | ------------ | --------------------------- |
   | 获取所有项目 | **GET** /api/project        |
   | 添加项目     | **POST** /api/project       |
   | 修改项目     | **PUT** /api/project/:id    |
   | 删除项目     | **DELETE** /api/project/:id |
