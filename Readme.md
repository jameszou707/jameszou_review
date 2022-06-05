# 核心知识====================

+ 推荐：markdown 语法记录笔记
  + 官方入门文档：https://markdown.com.cn/basic-syntax
  + 官方扩展语法：https://markdown.com.cn/extended-syntax/fenced-code-blocks.html
+ 学习用软件列表：[传送门](https://gitee.com/uptocoding/softwarelist)

## 1.h5c3与webapi-------------

+ 自适应布局：解决 不同终端问题
+ 弹性布局：相同终端，窗体大小改变

### 1.1 自适应布局

+ 通过JS 根据 页面的内容宽度，显示 不同的 布局盒子

![image-20220222140907583](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220222140907583.png)

### 1.2 弹性布局

+ 页面结构 用 flex 布局 ，页面文字等单位缩放用 rem
  + rem两件事情：计算基准值 和 使用rem单位


#### 1.2.1 计算基准值

> 通过`amfe-flexible` 等类似js库去根据屏幕宽度计算出来两个值：

```js
// set 1rem = viewWidth / 10
function setRemUnit() {
    let rem = document.documentElement.clientWidth / 10
    document.documentElement.style.fontSize = rem + 'px' // <html style="fontSize:16px">
}
```

+ rem基准值：放在 html根标签上，执行时机：首次加载，窗体改变大小
+ 字体默认大小：放在 body标签上，执行时机：首次记在

![image-20220222114230143](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220222114230143.png)

#### 1.2.2 使用rem单位

+ **自己写的样式代码**中 使用 rem：使用vscode 的 单位转换工具（pxtorem扩展工具）

  + 写代码时用px，根据这个扩展工具的配置 1rem = n px 来自动会转成rem

+ **第三方的组件库（vant）中** 的 px单位 需要 转成rem单位

  + 需要在 **webpack编译项目**时，进行转化
  + 过程：vue项目 -> webpack -> postcss模块 -> postcss-pxtorem模块 ->将 px转成 rem
  + 下载 并 配置 `postcss-pxtorem模块`
    + **npm i -D postcss_pxtorem**
    + 修改配置文件：`.postcssrc.js`

  ```js
  module.exports = {
      plugins: {
        'postcss-pxtorem': {
          // rootValue: 37.5, // 将 多少 像素 转成 1rem
          rootValue({file}){
            // 如果是 vant 组件库的样式，则使用 37.5 的基准值，否则使用 75的基准值
             return file.indexOf('vant') > -1 ? 37.5 : 75
          },
          // propList 配置 css中需要将px转成rem的 样式属性名称
          // propList: ['width','height','font-size'],
          propList: ['*']
          // 不被编译的 选择器，凡是符合的选择器中的px 都不会被转成 rem
          selectorBlackList:['markdown-body'],
          // 不被编译的 css文件
          exclude:'github-markdown'
        }
      }
    }
  ```


#### 1.2.3 长度单位对比

> px、rpx、em以及rem是我们开发移动端遇到的最常见的长度单位。我们在开发移动端的时候，就要首先去弄懂这几个长度单位的区别与用法，免得到时候有很多的兼容性问题。

##### px

> px像素（Pixel）。相对长度单位。像素px是相对于显示器屏幕分辨率而言的。(引自CSS2.0手册)

##### rpx

> rpx 其实是微信对于rem的一种应用的规定，官方规定屏幕**宽度为20rem**，规定屏幕**宽为750rpx**。

+ 所以在微信小程序中 `1rem=750/20rpx`
+ rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。
+ 如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。

![img](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220519_02.jpg)

##### em

> em是相对长度单位。相对于当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。(引自CSS2.0手册)

+ 浏览器默认的字号是16px。所有未经调整的浏览器都符合: 1em=16px。那么12px=0.75em,10px=0.625em。为了简化font-size的换算，需要在css中的body选择器中声明Font-size=62.5%，这就使em值变为 16px*62.5%=10px, 这样12px=1.2em, 10px=1em, 也就是说只需要将你的原来的px数值除以10，然后换上em作为单位就可以了。

+ em的特点：em的值并不是固定的；em会继承父级元素的字体大小。

  + 因为这两个特点，所以我们用em的时候，需要注意三点：

    a. body选择器中声明 font-size=62.5%；

    b. 将你的原来的 px数值 除以 10，然后换上em作为单位；

    c. 重新计算那些被放大的字体的em数值，避免字体大小的重复声明。

##### rem

> rem是CSS3新增的一个相对单位（root em，根em）

+ rem是相对于根标签<html>的字体大小，也就是说，我们只需要在根元素确定一个参考值，其他子元素的值可以根据这个参考值来转换。

+ 浏览器默认的字号是16px，我们来看一些px单位与rem之间的转换关系：

![img](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220519_01.jpg)

为了方便计算，我们经常在<html>元素中设置font-size值为62.5%，相当于在<html>中设置font-size值为10px，此时，上面示例中所示的值将会改变：

![img](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220519_03.jpg)

+ 如果css里面没有设定html的font-size，则默认浏览器以1rem=16px来换算。

### 1.3 子盒子被父盒子遮住

+ 问题：
  + 子盒子 设置绝对定位 超出父盒子时，会被父元素遮住，如图：
  + 如果想让子盒子 定位后 超出父盒子 的边框，怎么办？

![子盒子被父盒子遮住](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220505145700078.png)

+ 解决方案：把父盒子 的 overflow 改成 visible

![把父盒子的overflow改成 visible](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220505145557990.png)

### 1.3 dom操作

#### 1.3.1 bom和dom

![image-20220507154521504](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220507154521504.png)

#### 1.3.2 dom操作

+ **document.documentElement**，直接获取 页面的 根标签 `html`
+ 查找节点：
  + 旧语法（淘汰）
    + document.getElementById...
      + 返回 dom 或 null
    + document.getElementsByClassName..
      + 返回 NodeList 或 null
    + document.getElementsByTabName...
      + 返回 NodeList 或 null
  + 新语法-根据选择器去找(id/类/标签/属性选择器.....)
    + document.querySelector()  返回 dom或null
    + document.querySelectAll() 返回 NodeList或null

+ 修改节点属性：
  + dom的类型：有12种，重要的：
    + 元素类型： 根据 html标签生成
    + 文本类型：标签内嵌套的文字
    + 文本片段类型：相当于批量新增dom的一个临时容器，可以提高新增性能
    + 注释类型：注释标签 生成
    + ......

  + dom的属性
    + 元素dom类型对象的 属性是比较常用的
      + ele.id / ele.name /ele.style/ ele.chekced ......
      + 返回值类分：
        + 返回 字符串 : id / name / className .....
        + 返回 bool : chekced / selected / disable .....
        + 返回 样式对象: style

+ 删除节点：
  + 父元素.removeChild(子元素)
  + 事件委托

+ 添加节点：
  + 创建节点：document.createElement('div')
  + 向父元素里面 追加：父元素.appendChild(新元素)
  + 向父元素中旧子元素 前面插入 新子元素：父元素.insertBefore(新子元素 , 旧子元素)

#### 1.3.1 dom属性分类详解

+ 浏览器 会根据 标签 创建 dom对象

  + 每个 dom对象根据类型不同，拥有200-300多个属性(含0级事件属性)

+ dom对象 属性分类

  + **标准属性**：浏览器根据 **html标准语法** 创建的属性，eg. id,style , checked.....
  + **自定义属性**：程序员手动加入的 **非标准语法** 的属性，eg. stuno ....
  + **h5新出的 data- 自定义属性：** 程序员 手动 加入的 data-开头的 属性：eg.  data-id....

+ 添加属性方式与存储位置

  + 在 标签上 直接添加：

    + 标准、自定义、data-属性 都放在 **dom.attributes** 中
    + **同时** 标准属性 还设置给dom，data-属性 还设置给 dom.dataset 中(去掉了data-前缀)

    ![image-20220510162456685](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220510162456685.png)

  + 通过 **dom.setAttribute** 添加：

    + 标准、自定义、data-属性 都放在  **dom.attributes** 中
  
    + **同时** 标准属性设置给dom，data-属性 还设置给 dom.dataset 中(去掉了data-前缀)
  
    + 可以通过 **dom.getAttribute** 获取 dom.attibutes 里的属性
  
      ![image-20220513103212475](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220513103212475.png)

  + 通过 **dom.属性名** 添加：（本质 是 js 为对象添加 成员的 语法）

    + 标准属性 会同时 放在 dom.attributes 和 dom上；
    + 自定义属性只放在 dom上

  + 通过 dom.dataset 添加：

    + data-本质也是 自定义属性，所以放在 attributes 上
    + 同时 还设置给 dom.dataset 中(去掉了data-前缀)
  
  ![image-20220510115234535](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220510115234535.png)
  
  + 图解

![image-20220510102837187](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220510102837187.png)



### 1.4 页面渲染详解

#### 1.4.1 为什么要有dom

![image-20220509000812025](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220509000812025.png)

#### 1.4.2 三种树

+ Dom树，CSSOM树，RenderTree(呈现树)

![image-20220509000657796](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220509000657796.png)

#### 1.4.3 页面渲染过程

+ 根据 html 标签创建 **dom树**，根据 css 创建**css树**，再合并生成 **呈现树**，最后绘制界面给用户看

![image-20220509091949192](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220509091949192.png)



### 1.5 伪数组转真数组

+ 符合数组三要素：元素、下标、length 的对象，但**不包含数组的各种方法**
+ 如：NodeList ...
+ 那如果想让 伪数组 使用真数组的方法怎么办呢？
  + Array.from(伪数组) -> 将伪数组 转成 真数组 返回


```js
let list = document.querySelectorAll('div') // 返回了一个伪数组
list = Array.from(list) // 返回真数组
// 调用 数组的 各种方法了
```

### 1.6 事件冒泡与捕获

+ 事件冒泡：触发子元素的事件时，会 一路 触发 所有 的父级元素 同名事件，直到 html 标签结束
+ 事件捕获：触发子元素的事件时，先执行 根标签的同名事件，再逐级触发下一级同名事件，最后执行事件源的同名事件

![image-20220228182658747](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220228182658747.png)

### 1.7 dom事件绑定

+ 直接 绑定 匿名函数，缺点：相同代码的函数，浪费内存

![image-20220228181018017](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220228181018017.png)

+ 优化：dom共享共一个 函数

![image-20220228181132052](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220228181132052.png)

+ 问题：新增元素，没有事件

![image-20220228181247914](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220228181247914.png)

+ 解决方案：**事件委托！**

### 1.8 事件委托

+ 概念：就将 后代元素的事件，绑定给 父代元素，通过事件冒泡来触发
+ 解决问题：新增的后代元素事件 就不需要临时绑定了，反正会通过事件冒泡，触发父元素里的同名事件！
+ 解决方案：事件委托
+ 思路：
  + 将 dom事件 委托给已经存在的父辈元素
  + 在事件处理函数中，通过 `e.target.tagName`判断是否为目标元素，如果是，则执行业务

![image-20220228171413352](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220228171413352.png)

### 1.9 事件分类

#### a.鼠标事件

| 事件名      | 解释                                 |
| ----------- | ------------------------------------ |
| onclick     | 点击鼠标时触发此事件                 |
| ondblclick  | 双击鼠标时触发此事件                 |
| onmousedown | 按下鼠标时触发此事件                 |
| onmouseup   | 鼠标按下后又松开时触发此事件         |
| onmousemove | 移动鼠标时触发此事件，持续触发                 |
| onmouseover | 当鼠标移动到某个元素上方时触发(含子元素) |
| onmouseout  | 当鼠标离开某个元素范围时触 |
| mouseenter | 当鼠标进入元素边界时触发                 |
| mouseleave | 当鼠标离开元素边界时触发                 |

#### b.键盘事件

| 事件名     | 解释                                   |
| ---------- | -------------------------------------- |
| onkeypress | 当按下并松开键盘上的某个键时触发此事件 |
| onkeydown  | 当按下键盘上的某个按键时触发此事件     |
| onkeyup    | 当放开键盘上的某个按键时触发此事件     |

#### c.窗口事件

| 事件名         | 解释            
| -------------- | ----------------------------------------|
| onerror        | 出现错误时触发此事件 |
| onload         | 页面内容加载完成时触发此事件  |
| onmove         | 当移动浏览器的窗口时触发此事件 |
| onresize       | 当改变浏览器的窗口大小时触发此事件 |
| onscroll       | 当滚动浏览器的滚动条时触发此事件  |
| oncontextmenu  | 当弹出右键上下文菜单时触发此事件       |

#### d.表单事件

| 事件名   | 解释                                               |
| -------- | -------------------------------------------------- |
| onblur   | 当前元素失去焦点时触发此事件                       |
| onchange | 当前元素失去焦点并且元素的内容发生改变时触发此事件 |
| onfocus  | 当某个元素获得焦点时触发此事件                     |
| onreset  | 当点击表单中的重置按钮时触发此事件                 |
| onsubmit | 当提交表单时触发此事件                             |

### 1.10 window.parent和top

+ **window.parent** 是获取 **父页面** 的 **window**
+ **window.top** 是获取最 **上级祖页面** 的 **window**

![image-20220429095808909](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220429095808909.png)

## 2.前后端分离--------------

### ip和端口

![image-20220330181048966](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220330181048966.png)

### http

#### http协议

+ 重要本质：浏览器 和 服务器软件 通信的内容格式
  + 请求报文：浏览器 按照格式 发给 服务器的数据
  + 响应报文：服务器 按照格式 发给 浏览器的数据

![image-20220224180313476](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220224180313476.png)

#### http报文

![image-20220328181516951](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220328181516951.png)

#### http传参

![image-20220328181531189](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220328181531189.png)

### CDN

+ CDN 的全称是 Content Delivery Network，即内容分发网络

![img](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220412173123123123.png)

+ CDN 是构建在现有网络基础之上的智能虚拟网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块
+ 特点：
  + 就近获取所需内容
  + 降低网络拥塞
  + 提高用户访问响应速度和命中率
+ cdn服务商

![image-20220412180659252](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220412180659252.png)

### 软件公司团队合作

#### 岗位配合

+ 产品经理、UI设计师、前端开发、后端开发

+ 项目组人员配置：1-2个前端  +  2-4个后端

+ 流程：

  + 产品经理 分析需求，生产 **原型图**
  + UI设计师 根据 原型图 和 产品经理的 要求 设置 **PS文件**
  + 项目沟通会：产品经理+前端+后端 一起碰头交流
    + 后端程序员 编写 接口文档 + 后端代码
    + 前端程序员 编写 部分接口文档 + 前端代码
  + 开发阶段：
    + 后端程序员 按照接口 开发 后端服务器代码
    + 前端程序员 按照接口和ui 开发前端页面代码
      + 前端开发难度略低于后端，所以一般会超前，所以需要 mock.js 来伪造随机数据

+ 原型图

  ![image-20220222171721312](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220222171721312.png)

#### 开发流程![image-20220427145434516](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220427145434516.png)

### 团队协作开发工具

#### 前端与UI交流

> UI 设计师 一般 将UI设计稿 通过在线 方式 发给 前端开发，前端开发 按照设计稿 来写页面
> 产品经理 一般 将原型图 通过在线 方式 发给 前端开发，前端开发 按照原型图 直接理解业务

+ 原型图：

![原型图](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220510165408872.png)

+ 在线设计工具 (原型 和 UI图 都支持)

  + 墨刀：https://modao.cc/
  + 蓝湖：http://www.lanhuapp.com/
  + 摹客：https://www.mockplus.cn/
  
  ![image-20220423162805519](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220423162805519.png)
  
+ 制作原型图软件

  + Axure RP：https://www.axure.com/   官方文档：http://docs.axure.com.cn/

#### 前端与后端交流工具

+ 在线接口管理工具（生成api文档）

  <img style="height:150px" src="assets/image-20220423162225127.png"/>

  + yapi：http://yapi.smart-xwork.cn/ 让接口开发更简单高效，让接口的管理更具可读性、可维护性，让团队协作更合理
  + 适合公司业务比较复杂，尤其是跨部门协作的情况下使用，和它类似的工具还有rap、swagger、moco。
  + 功能：
    + 项目管理：提供基本的项目分组，项目管理，接口管理功能
    + 接口管理：友好的接口文档，基于websocket的多人协作接口编辑功能和类postman测试工具，让多人协作成倍提升开发效率
    + MockServer：基于Mockjs，使用简单功能强大
  + yapi：开发关系图

![image-20220423161950369](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220423161950369.png)

#### 前端工具

+ mock.js 伪数据

  + 官网：http://mockjs.com/

  + 作用：在 当今前后端分离开发的模式下，前端程序员和后端程序员是同时根据api文档开发代码

    这就很容易出现，前端开发人员 进度 快于 后端程序员，导致 前端没有可以访问的后端接口，

    此时，为了不影响进度，前端开发人员就需要使用mock.js类型的工具生成【伪数据】
    
    <img style="height:150px" src="assets/image-20220423164700309.png"/>

+ Eolink

  + 官网：https://www.eolink.com/
  + 文档：https://help.eolink.com/#/tutorial/?groupID=c-469&productID=13
  + 作用：Eolink 是一款定位专业级的一站式API协作平台，也是国内最早投身API工具研发的平台之一，团队早在2016年就发布了国内首个集**Swagger+Postman+Mock+Jmeter**单点工具于一身的开源产品Eoapi，能够快速解决API文档管理、快速测试、Mock、API自动化测试等问题。并于2017年正式发布了全球首个在线API全生命周期管理平台，帮助全球开发者更高效的开发、测试和运维API

  ![image-20220427145038144](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220427145038144.png)

  + 特点：
    + 支持所有类型的API文档管理
    + 一键发起API测试，打通 API 文档与测试
    + 0代码自动化测试，一键进行大范围回归测试
    + 根据API文档生成Mock API
    + 强大的COOKIE管理功能
  + 亮点：
    + API变更智能通知
    + API文档评论功能
    + API历史版本比对
    + 定时测试任务
    + 支持数据驱动
    + 项目分析报表

### git

#### git常见命令

+ 强烈推荐：详细复习 [【05Git.md】](./techs/05Git.md)

![image-20220508230826090](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220508230826090.png)

### 服务器

+ 服务器分：**开发环境** 和 **生产环境**
  + 开发环境的服务器：用来在本机或内网测试 代码
  + 生产环境的服务器：用来让外部用户访问，包含：
    + web服务器，接口服务器，业务服务器，数据库服务器等
    + 横向还可以部署 服务器集群 来解决大量用户访问的问题

![image-20220506202446266](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220506202446266.png)

### 异步请求

![image-20220510175623228](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220510175623228.png)

#### 原生ajax对象

```js
const xhr = new XMLHttpRequest()
xhr.open(method,url)
xhr.onreadystatechange = function(){
    if(xhr.readyState===4 && xhr.status ===200){
        let res = xhr.responseText // 获取 响应报文体 字符串数据！ `{"name":"死鬼","age":18}`
        res = JSON.parse(res) // 将 json字符串 转成 js对象
        //将数据 设置给 dom
    }
}
xhr.send()
```

#### 原生fetch

+ 浏览器原生的 基于 **Promise** 新的 异步方法，用来替代 `XMLHttpRequest` 对象，未来可能取代 **axios**
+ MDN手册：https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
+ 推荐阅读：https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html

##### 基础语法

```js
fetch(url).then(res => res.json())
  .then(data => console.log(data))
  .catch(e => console.log("报错啦：", e))
```

##### 封装fetch函数

+ 封装fetch ，兼容 **不支持 fetch** 的老式浏览器 

```js
export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
    type = type.toUpperCase(); // GET/POST...
    url = baseUrl + url; // 基地址+url
    // 如果是 get请求
    if (type == 'GET') {
        // 生成键值对字符串 k1=v1&k2=v2&  注意：最后多了个 &
        let dataStr = '';
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&';
        })
        // 如果 键值对字符串不为空，则说明有参数，去掉最后一个&，并集合?追加到url中
        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr;
        }
    }
    
    // 如果浏览器支持 fetch，则使用 fetch语法发送异步请求
    if (window.fetch && method == 'fetch') {
        // 准备 请求配置参数
        let requestConfig = {
            credentials: 'include',//为了在当前域名内自动发送 cookie ， 必须提供这个选项
            method: type, // GET/SET....
            headers: { // 请求头
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: "cors",// 请求的模式
            cache: "force-cache" // 缓存
        }
        // 如果请求方式为 post，则需要为请求报文体设置JSON格式数据 {"k1":v1, "k2":v2}
        if (type == 'POST') {
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            })
        }
        // 调用 fetch 发送请求，并传入配置参数
        try {
            // 获取 接口响应结果
            const res = await fetch(url, requestConfig);
            // 将 接口响应数据 转成 js对象
            const resJson = await res.json();
            // 返回 js对象
            return resJson
        } catch (error) {
            throw new Error(error)
        }
    } else {
        // 当 浏览器不支持 fetch，则使用 异步对象 来发送请求
        return new Promise((resolve, reject) => {
            let requestObj;
            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest();
            } else {
                requestObj = new ActiveXObject;
            }

            let sendData = '';
            if (type == 'POST') {
                sendData = JSON.stringify(data);
            }

            requestObj.open(type, url, true);
            requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            requestObj.send(sendData);

            requestObj.onreadystatechange = () => {
                if (requestObj.readyState == 4) {
                    if (requestObj.status == 200) {
                        let obj = requestObj.response
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj)
                    } else {
                        reject(requestObj)
                    }
                }
            }
        })
    }
}
```



#### jquey的ajax

```js
$.ajax({
    method:'get/post',
    url:'地址',
    data:'数据',
    success(res){ // 注意：jquery的ajax内部 成功回调函数的参数是响应报文体转成的对象
        if(res.属性){
            
        }
    },
    error(err){
        
    },
    complete(xhr){
        
    }
})
```

#### axios

+ 问题：为什么现在不用jquey的ajax了呢？
  + 因为 大部分项目 都用 vue 了，而 vue 很少需要程序员直接操作 dom，而是自动根据数据来操作dom
  + jquery 的90%代码都是帮助快速便捷操作 dom元素的！
  + 可见，在vue中适应 juquey还是比较浪费内存和带宽的！
  + 取而代之的，就是 **只提供ajax操作**的 **axios**!
  + 并且，axios 提供基于 Promise的异步操作，避免 **回调地狱语法** 的出现！

+ 直接将 axios 当做异步请求函数执行

```js
axios({
    method:'get/post...',
    url:'地址',
    params:{},// 传get参数
    data:{}, // 传post参数
}).then(function(res){ // 成功回调函数
    if(res.data.属性){  // 注意：axios的res.data才是响应报文数据对象
    }
}).catch(function(err){ // 失败回调函数
})
```

+ 通过axios创建新的axios实例来执行异步请求
  + 当服务器分成多个业务中心时，ip是不一样的，需要使用不同基地址的axios来请求


![image-20220221161947891](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220221161947891.png)

#### axios 与 响应拦截器

![image-20220406184253443](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220406184253443.png)

#### axios上传图片

+ 第一步：实现图片预览

![image-20220507163410821](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220507163410821.png)

+ 第二部：实现图片上传

  + 方案：使用 FormData 来封装上传文件数据
  + 技术点：
    + 使用 **FromData** 来封装 文件 和 表单相关数据
    + 需要设置 **请求头** ：ContentType和Authrization

  + 关键代码：

  ```js
  // 2.发送 post请求[json格式]，进行登录操作------------------------------------
  document.querySelector('#btnUpload').onclick = function () {
      // 1.创建 FormData 对象
      const fd = new FormData();
      // 2.向 FormData 中 添加 要上传的 数据(文件数据 和 其他相关数据)
      fd.append('photo', document.querySelector('#uploadImg').files[0]);
      // 3.发送 post请求
      axios({
          url: 'http://toutiao.itheima.net/v1_0/user/photo',
          method: 'PATCH',
          data: fd, // 设置要上传的数据(包含文件)
          headers: {
              'Content-Type': 'multipart/form-data', // 设置文件格式
              'Authorization': 'Bearer a64c7e42-02d1-41c9-a4f7-e1e3d68c6376' // 设置token
          }
      }).then((res) => {
          console.log('上传成功啦~！')
          console.log(res)
      })
  }
  ```

  + 图解：

  ![image-20220507175224613](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220507175224613.png)

+ 代码：

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>异步上传图片</title>
</head>

<body>
  <button id="btnUpload">确定上传</button>
  <hr>
  文件选择框：
  <input type="file" name="uploadImg" id="uploadImg">
  <hr>
  <h1>上传结果：</h1>
  <div id="divContent"></div>
  <hr>
  图片预览：
  <img src="" id="imgPre" alt="">

  <!-- 1.引入 axios文件 -->
  <script src="./lib/axios.js"></script>
  <script>
    // 一.实现 选择图片 预览
    // 1.设置 文件选择框的 change事件：当选择了不同的文件后，就会触发！
    document.querySelector('#uploadImg').onchange = function (e) {
      // 2.判断 是否有选中文件
      if (e.target.files.length === 0) {
        return alert('请选中要上传的文件~！')
      }
      // 3.将 选中文件 转成 一个 虚拟路径，设置给 图片标签 实现预览功能
      const imgUrl = URL.createObjectURL(e.target.files[0]);
      document.getElementById("imgPre").src = imgUrl;
    }

    // 2.发送 post请求[json格式]，进行登录操作------------------------------------
    document.querySelector('#btnUpload').onclick = function () {
      // 1.创建 FormData 对象
      const fd = new FormData();
      // 2.向 FormData 中 添加 要上传的 数据(文件数据 和 其他相关数据)
      fd.append('photo', document.querySelector('#uploadImg').files[0]);
      // 3.发送 post请求
      axios({
        url: 'http://toutiao.itheima.net/v1_0/user/photo',
        method: 'PATCH',
        data: fd, // 设置要上传的数据(包含文件)
        headers: {
          'Content-Type': 'multipart/form-data', // 设置文件格式
          'Authorization': 'Bearer a64c7e42-02d1-41c9-a4f7-e1e3d68c6376' // 设置token
        }
      }).then((res) => {
        console.log('上传成功啦~！')
        console.log(res)
      }).catch((err) => {
        console.log('上传失败啦~！')
        console.log(err)
      })
    }
  </script>
</body>

</html>
```



### 跨域解决方案

+ jsonp （淘汰）原理：通过 浏览器 不检查 标签跨域请求
+ cors（需要后端配合）原理：服务器通过 响应报文体 告诉 浏览器允许跨域请求
+ 代理服务器：通过 同源的自己的web服务器 去请求 目标服务器，而服务器之间是没有跨域检查的

### 防抖与节流

> 防抖（debounce）与 节流（throttle）

#### 防抖（debounce）

+ 通俗：王者荣耀回城，一旦打断，就需要重新计时
+ **一句话：不管触发多少次，总是只执行最后一次！**
+ 实现：通过 settimeout 推迟执行业务代码，一旦打断，重新计时

```js
data() {
    return {
        // 1.防抖定时器id
        timerId: null,
    };
},
// 防抖
// 最快没500毫秒才执行一次
fangdou() {
    // 2.如果 计时器id存在，则关闭计时器
    if (this.timerId) {
        // 关闭上一次计时器
        clearTimeout(this.timerId);
    }
    // 3.启动 新计时器，500毫秒后，执行 业务代码
    this.timerId = setTimeout(() => {
        // 4.业务：打印 当前时间！
        // 但是，为了防止频发触发，我们做 防抖处理
        console.log(new Date());
        // 5.业务执行后，要重置计时器id
        this.timerId = null;
    }, 500);
},
```

+ 防抖应用场景：
  + 登录、发短信等按钮避免用户点击太快，以致于发送了多次请求，需要防抖
  + 调整浏览器窗口大小时，resize 次数过于频繁，造成计算过多，此时需要一次到位，就用到了防抖
  + 文本编辑器实时保存，当无任何更改操作一秒后进行保存

#### 节流（throttle）

+ 通俗：坦克大战，1秒钟只能发射一发炮弹（不论下多少次射击命令）
+ **一句话：单位时间内，只执行一次业务（不管调用多少次）**
+ 实现：通过 节流阀(标志位 let a = false)
  + a.一旦启动业务，先判断 节流阀是否打开，如果打开，则不执行业务，如果关闭，则执行业务：
  + b.执行业务，并开启节流阀 a = true
  + c.当业务结束，再关闭节流阀 a = false

```js
timerId2: null, // 1.节流阀（标志位变量）
// 节流:每个阶段时间内，只执行一次业务
jieliu() {
    //2.判断 如果 已经开启节流阀（有计时器），则停止执行当前代码
    if (this.timerId2) return;
    //3.如果 未开启节流阀(没有计时器)，则启动 新计时器
    this.timerId2 = setTimeout(() => {
        console.log(new Date());
        this.timerId2 = null;
    }, 1000);
}
```

+ 应用场景：
  + scroll 事件，每秒计算一次位置信息等
  + 浏览器播放事件，每秒计算一次进度信息等
  + input 框实时搜索并发送请求展示下拉列表，每隔一秒发送一次请求 (也可做防抖)

### loadash

+ 官网：https://www.lodashjs.com/

+ 是一个 基于 Js的功能库，里面提供了很多优秀高效的 方法
+ 其中有一个 就是 防抖功能的 函数 **debounce**

#### debounce 防抖

+ 官网：https://www.lodashjs.com/docs/lodash.debounce#_debouncefunc-wait0-options

+ 由于防抖功能的代码 比较繁琐，也很简单，没必要每次都自己写，所以 可以通过 lodash库来帮我们快速创建

```js
//1.下载 npm i lodash
//2.引入，并命名为 _
import _ from "lodash";
//3.调用 debounce 函数 创建 包含业务代码和间隔时间的 防抖函数
fangdou2: _.debounce(function () {
   // 业务代码
   console.log(new Date());
}, 500)
//4.在视图中调用
<button @click="fangdou2">lodash防抖</button>
```

#### throttle 节流

+ 官网：https://www.lodashjs.com/docs/lodash.throttle#_throttlefunc-wait0-options

```js
//1.下载 npm i lodash
//2.引入，并命名为 _
import _ from "lodash";
//3.调用 throttle 函数 创建 包含业务代码和间隔时间的 节流函数
jieliu2: _.throttle(() => {
   // 业务代码
    console.log(new Date());
}, 1000),
//4.在视图中调用
<button @click="jieliu2">lodash节流</button>
```

#### cloneDeep 深拷贝

+ 官网：https://www.lodashjs.com/docs/lodash.cloneDeep#_clonedeepvalue

```js
var objects = [{ 'a': 1 }, { 'b': 2 }];
 
var deep = _.cloneDeep(objects);
console.log(deep[0] === objects[0]);
```

### nodejs

![image-20220510190614854](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220510190614854.png)

#### 中间件

+ 本质：express服务器的中间件，就是 一个 函数，只不过，所有的请求到服务器来后，都会经过中间件函数，然后再去 目标接口函数

![image-20220510184544901](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220510184544901.png)

+ 图解：

  浏览器 请求 `服务器接口`，会 先经过 `中间件函数`，再 执行 `接口函数`

![image-20220510185042395](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220510185042395.png)

### axios分片上传

+ 详解图

![image-20220328181124684](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220328181124684.png)



+ 代码

![image-20220328181214425](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220328181214425.png)

## 3.JS高级-------------------

### let/var

+ var 是 老式的语法，用来声明 变量
  + 有变量提升
  + 变量可以重名，后面的覆盖前面的同名变量
  + 没有块级作用域
+ let 是 新的语法，用来声明 变量
  + 没有变量提升
  + 不能重复声明同名变量
  + 有块级作用域

### jquery的$

+ jquery库 为了方便 程序员 使用它的功能，特意 将 导出的 jQuery构造函数 赋值给了 全局变量 `$`

```js
// jquery.js--------------------------
// .........
if (typeof noGlobal === "undefined") {
    window.jQuery = window.$ = jQuery;
}
```

### jquery对象与dom对象

+ jQuery 对象有两个部分：
  + dom数组，包含 根据选择器 找到的 dom
  + jQuery，原型的各种方法

![image-20220429100151455](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220429100151455.png)

### 神奇的 + 号

+ 功能：
  + 数字：加法运算
  + bool：加法运算
  + 字符串：拼接
  + 字符串 和 其他类型 ： 将其他类型 转成 字符串，再 拼接
+ 代码：

```
//a. 数值字符串 + 数值
alert('11' + 12); // '11' + '12'   ->  ’1112‘
alert(2 + '15'); // '2' + '15'   -> '215'

//b. 字符串 + 布尔值
alert('male：' + true); // 'male：' + 'true' -> ’male：true‘
alert('male：' + false); // ’male：false‘

//c. 字符串 和 引用类型相加：
// 字符串 + 对象.toString()
'abc' + [1,2,3]; // 'abc' + [1,2,3].toString() ->  'abc[1,2,3]'
'abc' + {a:12}; // 'abc' + {a:12}.toString() ->  'abc[Object object]'
'abc' + function(){...}; // 'abc' + 函数.toString() ->  'abc函数代码'
```

### 自定义toString

> JS中所有构造函数“继承”了Object构造函数
> 而Object的原型中有一个toString方法，所以 js中所有对象都可以通过原型链访问到 toString

+ 问题：能否在自己的构造函数中定义toString呢？可以！

+ 代码演示：

```js
// 字符串 和 引用类型相加：
// 字符串 + 对象.toString()
function Dog(name, age) {
    this.name = name;
    this.age = age
}

Dog.prototype.bark = function () {
    console.log('汪汪汪~~！')
}
Dog.prototype.toString = function () {
    return this.name + this.age + '构造函数~'
}

let d1 = new Dog('ruiky', 4)

let res = '讨厌' + d1

console.log(res)
```

+ 原理图：

![image-20220307160754243](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220307160754243.png)

### 自己实现forEach

+ from：Axios 的 utils 工具函数

```js
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *  用一个函数去迭代出啊如的：数组 or 对象
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 * 如果参数是数组，执行回调函数时会传入：value/index和 数组本身
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 * 如果参数是对象，执行回调函数时会传入：value/key和 对象本身
 *
 * @param {Object|Array} obj The object to iterate 
 *                       需要被遍历的数据对象
 * @param {Function} fn The callback to invoke for each item
 *                       回调函数
 */
 
function forEach(obj, fn) {
  // Don't bother if no value provided
  // 如果值不存在，无需处理
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  // 如果不是对象类型，强制转成数组类型
  if (typeof obj !== 'object') {
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    // 是数组，for循环执行回调fn
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    // 是对象，for循环执行回调fn
    for (var key in obj) {
       // 只遍历可枚举属性
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
```



### js预解析

+ 变量提升 和 函数提升

![image-20220304142818944](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220304142818944.png)

+ 函数内部的局部变量提升

![image-20220304143103542](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220304143103542.png)

### 函数声明方式

+ 声明式函数

```js
functioin a(x,y){
    return x + y
}
```

+ 匿名函数

```js
let a = function(){}
let b = ()=>{ }
```

+ 函数对象实例

  **充分这证明一件事：函数 也是对象！**

```js
let c = new Function('x','y','return x + y;')
Function.prototype.name = 'John'
c.name = 'Tom'
```

### 构造函数

+ 作用：就是一个对象工厂，批量创建 有 相同属性 和 共用相同方法的 对象
+ 特点：
  + 通过 this 来为 new的对象添加成员
  + 通过 构造函数.prototype 来为 本构造函数 创建的对象 共享成员

+ 代码：

```js
function Gun(name, price) {
    this.name = name
    this.price = price
}

Gun.prototype.shoot = function () {
    console.log('砰~~~！')
}

let g1 = new Gun('AK47', 1000)
let g2 = new Gun('M249', 2000)

g1.shoot()
g2.shoot()
```

### 构造函数原型详解

+ 构造函数的作用：批量创建对象！
+ **函数**的**显示原型(prototype)：**用来为 构造函数的 实例对象 共享 成员(方法/属性)
+ **实例对象**的**隐式原型(\_\_proto\_\_)：**指向 所属构造函数的 原型对象，用来访问共享成员
+ js引擎执行调用的过程：
  + `g1.name` -> js引擎 会 直接 去 g1对象中找 **name** 属性，返回属性值
  + `g1.gender` -> js引擎 会直接去 g1对象中找 **gender** 属性，就去 原型找，还找不到，再到上级原型找：
    + 如果都找不到，则 返回 **undefined**
    + 如果找到了，则 返回 **属性值**
  + `g1.shoot()` -> js引擎 会直接去g1对象中找 shoot方法，没有，就去 原型中找！
    + 找到后，调用 shoot方法，并 将 g1对象 传给 方法中的 this

![image-20220507150402494](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220507150402494.png)

![image-20220406183855841](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220406183855841.png)

### 自执行函数

+ 为什么要用自执行函数？---> **防止变量污染**

+ 语法：

  ```js
  (function add(a,b){
      log(a+b)
  })(1,2)
  
  // add(2,3) // 报错！
  ```


![image-20220222113136328](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220222113136328.png)

+ 自执行函数中的this
  + 凡是没有指定this的，就是window

```js
// 自执行函数里的 this 就是 window
(function a() {
  let b = 123
  console.log(this) // window(浏览器) / global(node)
})()
```

### 闭包

+ **本质：就是 不会立即销毁的 函数作用域对象**
+ 表现形式：函数内部返回使用局部变量的子函数/自执行函数/dom的事件绑定....
+ 作用：延长函数作用域的生命周期，避免变量污染...
+ 描述：当函数执行结束后，会自动销毁这次的作用域对象
  但是，本案例中，由于 返回的 内部函数 中 使用了 变量a
  所以，这个作用域对象还不能被销毁，这种情况 就叫做【闭包】

![image-20220225165329443](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220225165329443.png)

+ 闭包

![image-20220308104129116](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220308104129116.png)

### 作用域

+ 作用域：变量的访问范围
+ JS中有三种作用域：全局作用域，函数作用域，块作用域

```js
// 1.1全局作用域 -------------------
//  浏览器 -> window对象    
//  node  -> global对象

// 1.2函数作用域 -------------------
let b = 456
function showLove(toname) {
  let a = 123
  console.log(toname) // '小白'
  console.log(a, b) // 123 456
}
showLove('小白')
console.log(a) // 无法访问函数内部变量: Uncaught ReferenceError: a is not defined

// 1.3块级作用域 -------------------
// 注意：必须 配合 let 关键字 才有效果
let a = 123
if (a === 123) {
  let b = 456
  console.log(b)
}
console.log(b) // 无法访问块内部变量: Uncaught ReferenceError: b is not defined

for (let i = 1; i <= 1; i++) {
  let x = '讨厌'
  console.log('i->', i, x)
}
console.log(x) // 无法访问块内部变量: Uncaught ReferenceError: x is not defined
```

### 作用域链

+ 调用函数时，会产生函数的执行作用域对象，父子函数的作用域连在一起，就是作用域链

![image-20220427093602027](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220427093602027.png)

### 词法作用域

+ **(了解即可)**

![image-20220428085031549](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220428085031549.png)

+ 一般编程语言中有 静态作用域(词法作用域)  和 动态作用域 之分

  + 静态作用域(词法作用域)：每次调用函数时都会生成新的作用域对象，执行完就销毁，没有"复用"！

  + 动态作用域：执行时，自始至终，只有一个作用域对象，每次执行函数时，将 局部变量和形参 设置给这个对象；执行结束后，移出这些 局部变量和形参。

  + 参考阅读：https://www.emacswiki.org/emacs/DynamicBindingVsLexicalBinding

### 构造函数与原型关系

+ 函数原型：函数 通过 `prototype ` 属性向 `本函数的实例`  共享成员
+ 实例原型属性：new 的函数实例 通过 `__proto__` 访问 函数原型的共享成员

![image-20220304165106343](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220304165106343.png)

+ 原型对象的 **constructor** 指回 构造函数本身

![image-20220427090458543](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220427090458543.png)

### 原型链

+ 通俗：
  + 每个函数的 `prototype` 都是一个 对象，也有 `__proto__`指向上级的prototype，构成了一**链条**
  + 注意： `Object.prototype.__proto__ === null` 为止

![image-20220407172259528](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220407172259528.png)

+ 有继承关系的原型链

![image-20220425181713733](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220425181713733.png)



### 值类型和引用类型

+ 数据类型分两大类： 基本数据类型（值类型） + 复杂数据类型（引用类型）
  + 基本数据类型（值类型）：Number/String/Boolean/Undefind/Null
  + 复杂数据类型（引用类型）：Object/Function/Array.......

+ 值类型传参

![image-20220224174814378](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220224174814378.png)

+ 引用类型传参

![image-20220224174932201](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220224174932201.png)

### typeof与instanceof

> JS中有两种数据类型，值类型 与 引用类型，分别用不同语法来检测

#### typeof

+ 作用：检测值类型数据

+ `typeof` 返回**数据类型**的小写英文名称

  ```js
  typeof 'a' // 'string'
  typeof('a') // 'string'
  ```

+ 例子：

  ```js
  typeof 123 // 'number'
  typeof 'abc' // 'string'
  typeof undefined // 'undefined'
  typeof true // 'boolean'
  typeof Symbol() // 'symbol'
  
  function b() { }
  typeof b // 'function'
  
  // 注意：
  typeof null // 'object'
  typeof [] // 'object'
  typeof {} // 'object'
  ```

#### instanceof

+ 作用：检测引用类型
+ `instanceof` 根据 判断 对象的构造函数 是否和 检测一样，返回 boolean值

```js
// 定义构建函数
function Dog(){ }
let d1 = new Dog()
d1 instanceof Dog // true

let str1 = new String('abc')
str1 instanceof String // true

// 注意：
let str2 = 'abc'
str2 instanceof String // false
```

#### instanceof 原理

+ 就是 检测 `对象.__proto__.construcotr === 目标构造函数`
+ 如果 不相等，则顺着原型链找，直到找到相同的原型对象，返回 true，否则返回 false

+ 原理图：

![image-20220425181818192](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220425181818192.png)

#### 模拟 instanceof

```js
function instanceof2(left, right) {
    // 这里先用typeof来判断基础数据类型，如果是，直接返回false
    if(typeof left !== 'object' || left === null) return false;
    // getProtypeOf是Object对象自带的API，能够拿到参数的原型对象
    let proto = Object.getPrototypeOf(left);
    while(true) {
        if(proto === null) return false;
        if(proto === right.prototype) return true;//找到相同原型对象，返回true
        proto = Object.getPrototypeof(proto);
    }
}
```

### node.js 和 浏览器

+ 共同点：都包含 js引擎
+ 相同点：各自 拥有自己的 api接口

![image-20220223152450034](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220223152450034.png)

+ 浏览器与nodejs

![image-20220406184521585](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220406184521585.png)

### 包管理工具

+ 常见的： npm 和 yarn 和 cnpm
+ 作用：管理项目的 node 模块包，下载安装，删除，更新包....

#### npm

+ 全称：nodejs package manager (node包管理工具)

+ 安装：

  + 方式一：随 nodejs 一起安装，默认和nodejs在同一个目录
  + 方式二：用 yarn / cnpm 来安装 npm ，安装在 不同的包管理工具的 全局模块目录中

+ 运行：`npm i 包名`

  + 原理：
    + 去 安装目录中 找出 **npm.cmd** 脚本，内部 调用 **nodejs** 去执行 **npm-cli.js** 核心代码文件
    + `i 包名` 是作为 参数 传给 **npm-cli.js** 核心程序

  ![image-20220223154701457](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220223154701457.png)

#### yarn

+ 它是谷歌团队研发的包管理工具
+ 特点：
  + 最先 使用 并行下载，Npm是后来学了它的

#### cnpm

+ 其实 就是 npm，只不过 默认的下载镜像服务器 是 淘宝的镜像！

### 全局包的安装路径

#### npm全局路径

+ 命令：`npm config get prefix`

![image-20220223164429918](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220223164429918.png)

#### yarn全局路径

+ 命令：
  + 查看模块包路径：`yarn global dir`
  + 查看脚本路径：`yarn global bin`


![image-20220223164633971](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220223164633971.png)

#### 遇到找不到命令的错误

+ 一般出现在 安装好 全局包后，运行 包的命令，却找不到这个 包
+ 解决方案：
  + 将 `npm的全局安装路径`  和 `yarn的bin路径`  添加到 系统的**环境变量**的 path 中！
  + 重启 终端程序！才会读取最新的 环境变量！

### nrm切换镜像

+ 全称：npm registry manager(npm 镜像管理工具)
+ 作用：帮助 设置 本机 npm 的 镜像服务器地址的工具
+ 全局安装：`npm i -g nrm`

![image-20220223160723035](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220223160723035.png)

+ nrm常见命令：

  + 查看所有可用的知名镜像服务器：`nrm ls`

    ![image-20220223161339947](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220223161339947.png)

  + 修改 本机 npm 的镜像服务器地址：`nrm set taobao`,达到 修改 npm 下载镜像路径的目的

+ npm 全局安装

  + 命令：`npm i -g 包名`
  + 全局安装目录：`npm config ls` 打印的 prefix 就是 全局目录

![image-20220223161151433](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220223161151433.png)

### js中的导入导出

![image-20220225140025659](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220225140025659.png)

+ 问题：用什么语法 实现 js 中 引入js文件呢？谁来引入呢？

+ 解决方案：由浏览器来引入文件，按照什么语法规则 来识别呢？

  + 按照 业内 的 规范 来识别

+ commonJS规范

  + 资料：https://zhaoda.net/webpack-handbook/index.html
  + 规定了 js导入js使用  `require`导入/ `module.exports` 导出

```js
//1.js
module.exports = {
   name:'ruiky'
}
//2.js
let obj = require('./1.js')
console.log(obj.name)
```

+ ES6 中import/export
  + 默认导入导出
  + 按需导入导出


```js
// 默认导入导出----------------------------------
//1.js
export default {
    name:'ruiky'
}
//2.js
import obj from './1.js' // 注意：import 声明的是常量
console.log(obj.name)

// 按需导入导出----------------------------------
//1.js
export const name = 'ruiky'
export const age = 12
//2.js
import {name,age} from './1.js' // 注意：import 声明的是常量
console.log(name,age)
```

+ 在 Vue项目中配置 导入方式
  + 通过 package.json 中 设置 type 属性

![image-20220225115708703](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220225115708703.png)



### import 同步异步

+ 同步 导入 

  + `import a from './1.js'`
  + `import './1.js'`

+ 异步导入：以函数方式调用，返回 promise

  + `import('./1.js').then((res)=>{  })`

  ```js
  {
      name: 'layout',
      path: '/', // /#/
      component: () => import('@/views/layout/index.vue')
  }
  ```




### this关键字

+ this 是 函数内部的 **系统变量**，arguments 也是 函数内部的 **系统变量**

  + this 是在函数被 调用时
    + 默认 由 js引擎 为 **this** 传递值
    + 程序员也可以通过 代码 向 **this** 传递值

+ this 在执行时是什么值呢？

  + `谁.出这个方法，方法里的this就是谁`

    + 对象.方法

      ![image-20220225151249752](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220225151249752.png)

    + window.方法

  ![image-20220225150636564](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220225150636564.png)

### this思考

```js
let o1 = {
    a: {
        b: {
            c: 123,
            test() {
                console.log(this)
            },
            test2: () => {
                console.log(this)
            }
        }
    }
}

o1.a.b.test() // b对象
o1.a.b.test2() // window对象
```



### call/apply/bind

+ 函数 本身也是对象(Function)，所以 也有自己的成员
  + Function.call / Funcction.apply / Function.bind .....

```js
function say(a,b){
    console.log(this,a,b)
}
say(1,2) // -> window 1 2  因为本质是 window.say(1,2)
```

+ 如何修改 函数中的 this 呢？

```js
function say(a,b){
    console.log(this,a,b)
}
```

+  **call(参数1,实参列表...)** -> 调用的同时，参数1传给this，后面的实参依次传给方法形参
+ **apply(参数1,[实参1,实参2...])** -> 调用的同时，参数1传给this，数组中元素依次传给方法形参
+ **bind(参数1,实参列表...)** -> 不会调用函数，但会创建函数副本，副本中绑定了 this 和 形参

```js
// call :调用的同时，参数1传给this，后面的实参依次传给方法形参
say.call('abc',1,2) // -> 'abc' 1 2

// apply:调用的同时，参数1传给this，数组中元素依次传给方法形参
say.apply('abc',[1,2]) // -> 'abc' 1 2

// bind:创建函数副本，副本中绑定了 this 和 形参
let fn1 = say.bind('abc',1,2)
fn1() // -> 'abc' 1 2
// 注意：bind 生成的方法，调用时实参传递无用
fn1(5,6) //  -> 'abc' 1 2
```

+ 注意：**call 比 apply 效率更高**
+ 图例：

![image-20220225161850036](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220225161850036.png)

### 手写bind

```js
Function.prototype.fakeBind = function (obj, ...args) {
  return (...rest) => this.call(obj, ...args, ...rest);
};
```

### arguments

+ 函数内部 除了 `this`，还有一个 `arguments` 对象，用来保存 实参数据
+ 本质：保存了实参的 **伪数组**，有 **元素、下标、length**，但没有数组的方法

![image-20220304095337474](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220304095337474.png)

### 深拷贝/浅拷贝

+ 深拷贝：

  + 递归完全 拷贝 整个对象 所有成员

  + 通过JSON对象来实现深拷贝：JSON.parse(JSON.stringfy(obj))，注意不会拷贝方法
  + lodash.deepClone( )... 递归拷贝，包含方法

+ 浅拷贝：
  + 拷贝对象地址：直接用=赋值
  + 只拷贝对象的 第一层成员：for···in只循环第一层
  + Object.assign方法

#### 深拷贝深入

+ 方式一：采用递归去拷贝所有层级属性

```js
function cloneDeep(obj){
  const newObj = {};
  let keys = Object.keys(obj);
  let key = null;
  let data = null;
  for(let i = 0; i<keys.length;i++){
    key = keys[i];
    data = obj[key];
    if(data && typeof data === 'object'){
      newObj[key] = cloneDeep(data)
    }else{
      newObj[key] = data;
    }
  }
  return newObj
}
```

+ 方式二：解决了 对象属性的 循环引用问题(会导致死循环)
  + 判断一个对象的字段是否引用了这个对象或这个对象的任意父级，如果引用了父级，那么就直接返回同级的新对象，反之进行递归

```js
function deepCopy(obj, parent = null) {
    // 创建一个新对象
    let result = {};
    let keys = Object.keys(obj),
        key = null,
        temp = null,
        _parent = parent;
    // 该字段有父级则需要追溯该字段的父级
    while (_parent) {
        // 如果该字段引用了它的父级则为循环引用
        if (_parent.originalParent === obj) {
            // 循环引用直接返回同级的新对象
            return _parent.currentParent;
        }
        _parent = _parent.parent;
    }
    for (let i = 0; i < keys.length; i++) {
        key = keys[i];
        temp = obj[key];
        // 如果字段的值也是一个对象
        if (temp && typeof temp === 'object') {
            // 递归执行深拷贝 将同级的待拷贝对象与新对象传递给 parent 方便追溯循环引用
            result[key] = DeepCopy(temp, {
                originalParent: obj,
                currentParent: result,
                parent: parent
            });

        } else {
            result[key] = temp;
        }
    }
    return result;
}
```

### Object.create

+ 用来 创建新对象，并将 参数对象 作为 新对象的 `__proto__`属性

### 数组的api

+ [【数组专题-含笔试题】：传送门](./techs/02.1Array.md)

> 需要 提前了解 数组的api方法，后面会 去 学习 vue中针对数组的操作不同点

#### 增

+ push ： 从数组 尾部加入元素
+ unshift ： 数组的 头部加入元素
+ splice ：在指定位置 加入元素

#### 删

+ splice：从指定位置开始，删除指定个数的 元素
+ pop：从 尾部 取出元素
+ shift ：从 头部 取出

#### 筛选类

+ arr.filter 筛选出符合条件的 新数组
+ arr.some 判断数组中 是否 有 符合条件的 元素，只要有一个，就返回true，否则 返回 false
+ arr.includes 判断数组中 是否 有 符合条件的 元素，只要有一个，就返回true，否则 返回 false
+ arr.every 判断数组中 是否 所有元素都符合条件，也是返回 bool值

#### 查找类

+ find 根据条件 找第一个符合条件的 元素
+ findIndex 根据条件 找第一个符合条件的元素的 下标(索引)

#### 操作类

+ arr.sort 排序
+ arr.forEach 遍历数组
+ arr.map 遍历修改数组
+ arr.reduce 箩筐方法：一般用来 求 累加和 或 累乘积
+ arr.join 将数组拼接成一个 字符串
+ arr.slice 截取 子数组
+ arr.reverse 翻转数组

#### 相关方法

+ str.split 将字符串按照 分隔符 拆成一个 数组

#### 数组方法例子

##### sort

+  问题：数组 的 实现了sort方法内部高效排序算法，但是 涉及到 两个元素比较大小时，不知道怎么比
+  解决方案：程序员调用时，传入 比较大小的 方法，并约定：
   + 方法返回 为 正数，说明 前面的元素 > 后面的元素
   + 方法返回 为 负数，说明 前面的元素 < 后面的元素
   + 方法返回 为  0  ，说明 前面的元素 == 后面的元素

```js
let arr3 = [
    { id: 4, name: '小白' },
    { id: 2, name: '白白白白白' },
    { id: 1, name: '大白白' },
    { id: 5, name: '洗' },
    { id: 3, name: '漂白' },
]

// --------------升序---------------
// 按照id排 正序(升序-有小到大)
arr3.sort(function (pre, next) {
    return pre.id - next.id
})
```

##### splice

+ 可以用来执行 删除、替换、插入 元素操作

```js
let arr = ['P城', 'G港', '医院', '学校', 'Z城']
//           0      1      2        3      4
// 1.【删除】 元素(下标，数量)
arr.splice(2, 1) // 从下标2开始删除1个
arr.splice(2, 2) // 从下标2开始删除2个
arr.splice(2) // 如果不传数量，则直接删到最后一个元素
console.log(arr)

// 2.【替换】元素（下标，数量，新元素）
arr.splice(2, 1, '机场',) // 用 '机场' 替换 '医院'
arr.splice(2, 1, '机场', 'Y城') // 用 '机场'和'Y城'  替换 '医院'

// 3.【插入】元素（下标，0，新元素）
arr.splice(2, 0, '讨厌死鬼') // 在 '医院'前面 插入一个新元素 '讨厌死鬼'
console.log(arr)
```

##### filter 方法

+ 用来从原数组中 筛选 符合条件的元素 到新数组

+ filter内部 会 遍历元素，并 将元素 逐个 传给 回调函数，根据返回值 决定是否 加入新数组返回
  + 回调函数返回值，如果是 true，则 将元素 加入 **新数组**
  + 回调函数返回值，如果是 false，则 忽略该元素
+ 注意，filter函数 会返回 符合条件元素的 **【新数组】**，不影响 **原数组**

```js
// 1.案例1：筛选 符合条件的数字
let arr = [5, 4, 42, 7, 1, 9, 20, 41, 12]
let newArr = arr.filter(function (ele, ind) {
    return ele > 10 && ele < 40
})
console.log(newArr)

// 2.案例2：筛选 name长度>2的对象
let arr3 = [
    { id: 4, name: '小白' },
    { id: 2, name: '白白白白白' },
    { id: 1, name: '大白白' },
    { id: 6, name: '徐静蕾好好看哦' },
    { id: 5, name: '洗' },
    { id: 3, name: '漂白' },
]

// let arrNew = arr3.filter(function (ele) {
//     return ele.name.length > 2
// })
// 箭头函数的简化语法：
// 0.可以 省略 function 关键字
// 1.如果 形参只有一个，可以省略 小括号 ()
// 2.如果 代码块只有一行代码，可以省略 花括号 {}
// 3.如果 代码块只有一行代码，可以省略 return 关键字

let arrNew = arr3.filter(ele => ele.name.length > 2)

console.log(arrNew)
```

##### find 查找元素

+ 根据 条件 查找 符合的 第一个元素,如果没找到，则返回 undefined

```js
// let test1 = '徐静蕾好好看哦'.includes('邹') // 返回 bool值
// let test2 = '徐静蕾好好看哦'.indexOf('邹') // 返回字符的下标，如果没找到，返回 -1
// console.log(test2)
let arr3 = [
     { id: 4, name: '小白' },
     { id: 2, name: '白白白白白' },
     { id: 1, name: '大白静白' },
     { id: 6, name: '徐静蕾好好看哦' },
     { id: 5, name: '洗衣服' },
     { id: 3, name: '漂白' },
 ]

 let target1 = arr3.find(ele => ele.name.includes('静'))
 console.log(target1)
```

##### findIndex 查找元素下标

+ 根据 条件 查找 符合的 第一个元素 的下标,如果没找到，则返回 -1

```js
let arr3 = [
    { id: 4, name: '小白' },
    { id: 2, name: '白白白白白' },
    { id: 1, name: '大白静白' },
    { id: 6, name: '徐静蕾好好看哦' },
    { id: 5, name: '洗衣服' },
    { id: 3, name: '漂白' },
]

let target1 = arr3.findIndex(ele => ele.name.includes('静'))
console.log(target1)
```

##### includes 

```js
// 对比 includes 方法
// 去判断 数组中 是否有 相同的 元素，返回 bool
let arr = [5, 4, 42, 7, 1, 9, 20, 41, 12]
let isOk1 = arr.includes(77) // 查找 简单类型数组（值类型数组）
//let isOk1 = arr.some(x => x === 7) // 查找 复杂数据类型数组（引用类型数组）
console.log(isOk1)

```

##### map 修改元素

+ 作用：修改元素，装入新数组返回
+ 注意：
  + 如果数组中装的 **值类型数据**，则 **不会** 影响原数组
  + 如果数组中装的 **引用类型数据**，则 **会** 影响原数组

```js
// map 遍历 值类型数组
let arr7 = ['P城', 'G港', '医院', '学校', 'Z城']
let res3 = arr7.map(ele => ele += '_讨厌死鬼')
console.log(res3) 
```



```js
// map 遍历 引用类型数组
let arr4 = [
    { id: 4, name: '小白' },
    { id: 2, name: '白白白白白' },
    { id: 1, name: '大白静白' },
    { id: 6, name: '徐静蕾好好看哦' }
]

let res2 = arr4.map(ele => {
    ele.id += 100
    ele.name += '__1008'
    return ele
})

console.log('map返回值：', res2) // undefined
```

+ map修改 引用类型元素的 数组

![image-20220224174654167](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220224174654167.png)





#### 数组模拟堆栈和队列

![image-20220224143907919](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220224143907919.png)

```js
let arr = [1,2,3]
arr[1]= 5 // [1,5,3]

let arr = []
arr.unshift(1) // [1]
arr.unshift(2) // [2,1]
arr.unshift(3) // [3,2,1]
let a1 = arr.shift() // [2,1]
let a2 = arr.shift() // [1]
let a3 = arr.shift() // []
```

+ 栈结构（先进后出）
  + 从 尾部 加入，从 尾部 取出
  + 从 头部 加入，从 头部 取出
+ 队列结构（先进先出）
  + 从 尾部 加入 ，从 头部 取出
  + 从 头部 加入 ，从 尾部 取出

### Set的api

> Set 是JS提供的一种元素不会重复的"新数组"，元素会按添加的先后顺序存入，但不会保存重复元素

+ Set 中的元素是唯一的。

```js
let mySet = new Set();

mySet.add(1); // Set [ 1 ]
mySet.add(5); // Set [ 1, 5 ]
mySet.add(5); // Set [ 1, 5 ] , 因为已经存在5，所以本次添加不会生效
mySet.add("some text"); // Set [ 1, 5, "some text" ]
let o = {a: 1, b: 2};
mySet.add(o); // Set [ 1, 5, "some text",对象1地址 ]

mySet.add({a: 1, b: 2});  // Set [ 1, 5, "some text",对象1地址,对象2地址 ]

mySet.has(1); // true
mySet.has(3); // false
mySet.has(5); // true
mySet.has(Math.sqrt(25));  // true
mySet.has("Some Text".toLowerCase()); // true
mySet.has(o); // true

mySet.size; // 5

mySet.delete(5);  // true,  从set中移除5
mySet.has(5);     // false, 5已经被移除

mySet.size; // 4, 刚刚移除一个值

console.log(mySet);
// logs Set(4) [ 1, "some text", {…}, {…} ] in Firefox
// logs Set(4) { 1, "some text", {…}, {…} } in Chrome
```

+ 数组去重

```js
// 封装一个 数组去重函数
function dedupe(array) {
    // 通过 Set 实现去重，然后再转成 数组 返回
    return Array.from(new Set(array))
}

// 将 数组 转成 Set对象
let arr = [1, 2, 3, 4, 2]

let s2 = dedupe(arr)

console.log(arr)
console.log(s2)
```



### String的api

#### replace详解

+ 返回 替换后 的 新字符串

+ 语法：`let newStr = str.replace(regexp|substr, newSubStr|function)`
  + regexp (pattern)
    一个RegExp 对象或者其字面量。该正则所匹配的内容会被第二个参数的返回值替换掉
  + substr (pattern)
    一个将被 newSubStr 替换的 字符串。其被视为一整个字符串，而不是一个正则表达式。仅第一个匹配项会被替换
  + newSubStr (replacement)
    用于替换掉第一个参数在原字符串中的匹配部分的字符串。该字符串中可以内插一些特殊的变量名。参考下面的使用字符串作为参数
  + function (replacement)
    一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果。参考下面的指定一个函数作为参数
+ 例子：

```js
// 原始字符串
let a = 'abcaef'

// 替换 首次遇见的 'a' -> 'A'
let b = a.replace('a', 'A')
console.log(b) // 'Abcaef'

// 替换 所有的 'a' -> 'A'
let c = a.replace(/a/g, 'A')
console.log(c) // 'AbcAef'
```

#### 反引号字符串

+ 字符串： 双引号 "abc"  、单引号 'abc'  、反引号 \`abc\`

+ 反引号字符串特点：可以使用 `${变量名}` 直接将`变量的值` 替换到字符串中 

```js
// 原始字符串
let gfname = 'linda'
// 反引号 `` 中可以使用 ${变量名} 直接将变量的值 替换到字符串中 
let b = `i love ${gfname}`
// 输出
console.log(b)  // -> 'i love linda' 
```

#### 替换{{}}语法

```js
// 1.数据对象
let dog = {
    name: 'Ruiky',
    age: 4,
    sex: '公'
};

// 2.模板字符串
let codeStr = '我的小狗叫：{{name}}，{{age}}岁，是一只小{{sex}}狗~';

// 3.解析 胡子语法 方法
function mustacheStr(orStr, data) {
    // 通过为 String.replace 传回调函数，查找 符合 正则的字符串
    // target:匹配正则的字符串
    // keyword:正则()中提取的字符串
    // index：匹配字符串的下标
    // p3：原始字符串
    // 注意：正则中的 () 是用来提取字符串的
    return orStr.replace(/\{\{(.*?)\}\}/g, function (target, keyword, index, p3) {
        console.log(target, keyword, p2, p3); 
        // '{{name}}'  'name'  6  '我的小狗叫：{{name}}，{{age}}岁，是一只小{{sex}}狗~'
        return data[keyword];
    });
}

// 4.调用方法，传入 模板字符串和数据对象，获取替换后的结果
let strRes = mustacheStr(codeStr, dog);
// 5.打印结果
console.log(strRes);
// 输出：'我的小狗叫：Ruiky，4岁，是一只小公狗~'
```



## 4.webapi--------------------

### 二种dom事件

+ 0级dom事件：属于 dom的 onXXX 属性

+ 2级dom事件：属于 内存里的 一张` "2级事件表"`

  ![image-20220407172728310](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220407172728310.png)

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>测试</title>
    <style>
        div {
            border: 1px solid #000;
            background-color: #0094ff;
            padding: 10px;
            color: #fff;
        }
    </style>
</head>

<body>

    <!-- document.querySelector('#testDiv').onclick = function(){ window.showData(this) } -->
    <!-- <div id="testDiv" data-dogname="ruiky" onclick="showData(this)">讨厌死鬼</div> -->
    <div id="testDiv" data-dogname="ruiky">讨厌死鬼</div>
    <button id="btnRemove">删除事件</button>
    <script>
        // 1.dom的 0级dom事件：dom对象 onXxxx 事件属性，事件处理函数 直接 设置给 dom对象的事件属性！
        //  设置方式：
        //  a.在标签上直接设置 <div onclick="alert(123)">讨厌死鬼</div>
        //  b.通过 dom语法设置
        //  特点：
        //  a.只能存1个事件处理函数
        //  b.删除事件处理函数：dom.onclick = null
        // document.querySelector('#testDiv').onclick = showData

        // function showData(dom) {
        //     console.log(dom)
        //     console.log(dom.dataset)
        //     console.log(dom.dataset.dogname)
        // }

        // 2.dom的 2级dom事件： addEventListener(事件名，事件处理函数，是否冒泡阶段)
        //  特点：
        //  a.可以存n个事件处理函数
        //  b.可以根据dom+事件名删除 指定的 事件处理函数 removeEventListener
        function click1() {
            console.log(123)
        }
        // 添加方式：
        // a.将【具名函数】作为 事件处理函数 绑定给 2级dom事件 -> 可移除此事件处理函数
        document.querySelector('#testDiv').addEventListener('click', click1, true)
        // b.将【匿名函数】作为 事件处理函数 绑定给 2级dom事件 -> 不可移除此事件处理函数
        document.querySelector('#testDiv').addEventListener('click', function () {
            console.log(456)
        }, true)

        document.querySelector('#btnRemove').addEventListener('click', function () {
            console.log('删除 div的第一个事件')
            // 移除方式：为 相同 dom的 相同事件 移除 指定的 处理函数！
            document.querySelector('#testDiv').removeEventListener('click', click1, true)
        })
    </script>
</body>

</html>
```



### reqiure函数实现

+ require函数可以导入 各种类型的资源，一般用来导入 js居多
+ 我们通过自己实现一个 来彻底理解 `module.exports` / `exports` 的关系

```js
// ------------------1.定义myRequire函数---------------------
// 自己实现 require 函数 =======================
function myRequire(filePath){
   //导入 内置模块
   const path = require('path') // 路径处理
   const fs = require('fs') // 硬盘读写
  // 0.声明 变量 ------------------------------
  let module = {
    ....
    exports:{}
    ....
  }
  let exports = module.exports 

  // 1.读取 传入的 文件内容 ---------------------
  // 1.1 拼接文件物理路径
  filePath = path.join(__dirname,filePath)
  // 1.2 读取文件内容
  const content = fs.readFileSync(filePath,'utf8')

  // 2.运行 读取出来的 JS 代码 -----------------
  eval(content) // 注意，eval执行的代码 享用 当前函数的作用域

  // 3.返回 module.exports
  return module.exports
}
module.exports.myRequire = myRequire

// ------------------2.my.js--------------------------------
module.exports = {
    name:'ruiky',
    age:22,
    sayHi(){ console.log(this.name) }
}

// ------------------3.测试调用--------------------------------
const my = myRequire('./my.js')
console.log(my)
```



### DOMContentLoaded

+ DOMContentLoaded ，在 页面整个dom树生成后，立即执行  类似`jquery的入口函数`
+ window.onload ，在页面dom树生成，页面资源加载完毕后，立即执行

### 表单数据校验

### 微前端

+ 微前端库：
  + 【qiankun】https://qiankun.umijs.org/zh/guide

### 宏任务微任务

> + 为什么 js引擎是单线程的？避免资源竞争 ，如：避免多个线程同时操作同一个dom
> + 解决方案： 
>   + web worker(权利不大的子线程，只能帮主线程分担计算任务，不能操作IO)
> + 怎么解决 非阻塞呢？--- Event Loop

+ JS中任务分两大类
  + 同步任务：由JS引擎主线程执行
  + 异步任务：由宿主环境执行


#### EventLoop

+ 【jake archibald in the loop】https://www.bilibili.com/video/BV1a4411F7t7
+ 【Philip Roberts：到底什么是Event Loop呢？】https://www.bilibili.com/video/BV1oV411k7XY

+ JS引擎主线程 执行栈(队列)：js原生代码
+ 宿主环境：webapi / nodeapi 等

+ 所有同步任务都在主线程上执行，形成一个执行栈
+ 当主线程中的执行栈为空时，检查事件队列是否为空，如果为空，则继续检查；如不
  为 空，则执行
+ 取出任务队列的首部，加入执行栈
+ 执行任务
+ 检查执行栈，如果执行栈为空，则跳回第 2 步；如不为空，则继续检查

![image-20220225171703995](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220225171703995.png)

#### 宏任务微任务

![image-20220225171728873](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220225171728873.png)

+ 执行顺序： 同步任务 > 微任务 > 宏任务

+ 概念：

  + 宏任务：指的所有通过宿主环境执行后的回调函数，就是宏任务，会被宿主环境添加到任务队列中等待js引擎主线程调用

    ```text
    script(整体代码)
    setTimeout
    setInterval
    I/O
    UI交互事件
    postMessage
    MessageChannel
    setImmediate(Node.js下)
    ```

  + 微任务：在 这些 宏任务回调函数内部的 异步任务，就叫做微任务，比如 Promise.....

    ```text
    Promise.then
    Object.observe
    MutationObserver
    process.nextTick(Node.js下)
    ```

+ 运行机制：

  在事件循环中，每进行一次循环操作称为 tick，每一次 tick 的任务处理模型是比较复杂的，但关键步骤如下：

  - 执行一个宏任务（栈中没有就从事件队列中获取）
  - 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
  - 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
  - 当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
  - 渲染完毕后，JS线程继续接管，开始下一个宏任务（从事件队列中获取）

### 异步请求方案

#### 请求方案

+ ajax 浏览器原生api：基于 XMLHttpRequest 和 回调函数
+ fetch 浏览器原生api：基于 promise 语法
+ jquery.ajax：基于 ajax原生 +  回调函数
  + 90%以上的代码 都是操作dom的
  + 剩下一点代码，提供 ajax 操作
+ axios：基于 promise 语法 +  ajax原生 

#### 为什么现在很少用jquery？

+ 现在大部分项目 都用 vue，不需要操作dom，所以单纯想用 ajax的话，没必要使用jquery库
+ 而是 可以选择 专注于ajax功能的 axios库！

### axios详解

+ 官网：https://www.axios-http.cn/
+ 重要配置：https://www.axios-http.cn/docs/req_config
+ 创建方式：
  + 通过 axios 函数执行 发送异步请求
  + 通过 axios.create 创建 新的 axios实例 来发送异步请求

#### 基本调用语法1

```js
import axios from 'axios'
axios({ })
axios.get()
axios.post()
axios.delet()
// ................
```

#### 发送 各种请求的参数

```js
import axios from 'axios'
// 1.get传参：通过 params 传递
axios({
	method:'get',
    url:'/details' // ?id=1
    params:{id:1}
}).then(function(res){ // 成功回调函数
    console.log(res.data)
})

// 2.post传参：通过 data 传递
axios({
	method:'post',
    url:'/adduser'
    data:{ uname:'linda',pwd:'123123' }
}).then(function(res){  // 成功回调函数
    console.log(res.data)
})
```

#### 成功回调函数

+ axios成功回调函数 **res.data** 才是 响应报文体数据（服务器返回的业务数据）

![image-20220222165724419](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220222165724419.png)



![image-20220222165650182](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220222165650182.png)

#### 失败回调函数

+ 执行时机：当 响应报文的 **status 状态码** 不是 **2xx** 开头的，就会 执行失败回调函数

```js
import axios from 'axios'
// 1.get传参：通过 params 传递
axios({
	method:'get',
    url:'/details' // ?id=1
    params:{id:1}
}).then(function(res){ // 成功回调函数
    console.log(res.data)
}).catch(function(err){ // 失败回调函数
    
})
```

![image-20220222170824089](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220222170824089.png)

#### async/await结合

+ 单纯 **简化** 通过 **成功回调函数** 获取响应对象

```js
import axios from 'axios'
function async doAjax(){
	// 1.get传参：通过 params 传递
    const res = await axios({
        method:'get',
        url:'/details' // ?id=1
        params:{id:1}
    })
}
```

+ 同时  **简化** 通过 **成功回调函数** 获取响应对象 和 **失败回调函数** 获取错误对象

```js
import axios from 'axios'
function async doAjax(){
	try{
        // 1.get传参：通过 params 传递
        const res = await axios({
            method:'get',
            url:'/details' // ?id=1
            params:{id:1}
        })
    }catch(err){
        console.log('出错啦：',err)
    }
}
```

+ 语法对比

![image-20220222171230795](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220222171230795.png)

#### validateStatus

+ 当 **响应报文** 被浏览器 axios接收到后，会 将 **响应状态码** 传给 **validateStatus** 函数
  + 如果 返回 true，则继续执行 **try 代码块**
  + 如果 返回false，则执行 **catch代码块**

![image-20220223111405348](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220223111405348.png)

## 5.Vue ------------------------

### 组件命名规范

+ 单文件组件命名：大驼峰 or 小写短横线

  ![image-20220402090911525](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220402090911525.png)

+ 基础组件命名：应用特定样式和约定的基础组件 (也就是展示类的、无逻辑的或无状态的组件) 应该全部以一个特定的前缀开头，比如 `Base`、`App` 或 `V`

  ![image-20220402091003439](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220402091003439.png)

+ 单例组件命名：整个项目只能有一个实例的组件

  ![image-20220402091227101](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220402091227101.png)

+ 紧耦合组件命名：命名要相关联

  ![image-20220402091457439](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220402091457439.png)

### Vant组件库注册源码

![image-20220406183607712](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220406183607712.png)

### 自定义组件库

![image-20220406183205943](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220406183205943.png)

+ 通过 Vue.use + install 方法 注册全部组件

![image-20220406190001965](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220406190001965.png)

+ 注册后的组件位置

![image-20220406190046447](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220406190046447.png)

### 二次封装组件库

+ 参考本文：面试题 -> 2.二次封装组件库

### Vue修饰符

![image-20220405214126278](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220405214126278.png)

> 几个重要的修饰符： .trim / .number / .native / .sync / .stop / .prevent / .enter

#### 表单修饰符

+ 场景：表单元素标签，如 `<input v-model.trim="usrName">`
+ 三个修饰符：
  + .lazy -> 将 默认的 `input事件` 改成 `change事件`
  + .trim -> 过滤两边空格
  + .number -> 自动转成数值(parseFloat)，如果转换失败，返回原值

#### 事件修饰符

+ 场景：对事件捕获以及目标进行了处理 

+ 7个修饰符：

  + stop -> 阻止冒泡 (e.stopPropagatioin)

  + prevent -> 阻止默认行为 (e.preventDefault)

  + self -> 只在 e.target 是当前元素时触发 (避免因子元素事件冒泡而触发)

  + once -> 只触发一次

  + capture -> 从当前元素开始 将 事件冒泡(子->父) 改为 事件捕获(父->子)

  + passive -> 相当于 onscroll 事件 的 lazy 修饰符，在移动端防止滚轮过渡 onscroll 事件

    ```html
    <div @scroll.passive="aaa">
    </div>
    ```

  + **.native** -> 为 自定义组件的 根标签 添加 **dom事件**！

  ![image-20220406170046152](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220406170046152.png)

#### 键值修饰符

+ 场景：Vue 的键盘事件(keyup/keydown...) 方便判断 按键：

##### 预设修饰符

+ 普通键和修饰键：
  + `.enter` 
  + `.tab` 
  + `.delete` (捕获“删除”和“退格”键)
  + `.esc`
  + `.space`
  + `.up`
  + `.down`
  + `.left`
  + `.right`
  + `.ctrl`
  + ...

##### 按键数字修饰符

+ 由于 预设修饰符只有7个，如果想监听其他按键，则可以是用数字代替
  + 比如 `字母 a/A` ，可以使用 `@keyup.65='事件处理函数'`

##### 自定义按键修饰符

+ 配置全局自定义按键修饰符

+ 需要去 main.js 中 配置，在任意组件视图中使用

  `Vue.config.keyCodes.a = 65`

  ![image-20210909163942488](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20210909163942488.png)

#### 属性修饰符

> 场景：针对**动态属性**的修饰符

##### .sync

+ 作用：对 子组件的多个 props 属性做双向数据绑定，场景：子组件有多个prop属性需要双向数据绑定

+ 原理：

  + 动态属性 负责 将 父组件数据 传给子组件 prop 属性

  + `.sync`修饰符 负责 为 子组件标签 添加 自定义事件 `@update:属性名="父组件属性 = $event"`

    子组件内部 通过 `$emit('update:属性名',新值)`将新值 传给 父组件属性

  ![image-20220406172208392](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220406172208392.png)


##### .prop 

+ 作用：将 自定义属性 隐藏起来，增加数据的隐秘性



![image-20220406175140020](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220406175140020.png)

+ 区分两种属性：
  + Attribute 包含 标签 定义的所有属性
  + Property 包含 HTML 标准的属性
+ 代码：

```js
<input id="input" type="dog" value="ruiky" :data="inputData"></input>
// 输出: <input id="input" type="dog" value="ruiky" data="inputData值"></input>
// input.data -> undefined
// input.attributes.data -> this.inputData

<input id="input" type="dog" value="ruiky" :data.prop="inputData"></input>
// 输出: <input id="input" type="dog" value="ruiky"></input>
// input.data -> this.inputData
// input.attributes.data -> undefined
```

##### .camel

+ 用 DOM 模板时将 v-bind 属性名称驼峰化

+ 参考文档：https://segmentfault.com/q/1010000020322122

### Vue混入mixin

+ 作用：提供一个 所有 组件 都可以通用的 **组件配置对象**(data/methods/钩子函数.......)
+ 通俗：复用 一套 组件的 配置信息
+ 文档：https://cn.vuejs.org/v2/guide/mixins.html
+ 特点：
  + 如果 混入对象 和 组件中 都有同名 钩子函数，会 先执行 混入对象的钩子，再执行 组件中的钩子
  + 混入对象 和 组件 可以相互访问成员
+ 原理：本质 就是 将 混入对象 的成员 一起平铺到 当前组件对象中！
+ 代码：

```js
// ./src/mixins/index.js
// 【0.导出公共混入对象(多个组件复用的配置信息)】
export default {
  data() {
    return {
      usrName2: 'ruikey mixin1'
    }
  },
  created: function () {
    console.log('mixin1 created函数', this.usrName2) // 访问当前对象的数据
    console.log('mixin1 created函数', this.usrName)  // 访问目标组件的数据
  },
  methods: {
    say2() {
      console.log(456)
    }
  }
}

```

```vue
// ./src/views/app.vue
<script>
// 【1.导入 混入对象】
import mixin1 from '@/mixins'
    
export default {
  name: 'App',
  // 【2.为组件对象 注入 混入对象】
  mixins: [mixin1],
  data() {
    return {
      usrName: 'Ruiky',
      usrAge: 18
    }
  },
  mounted() {
    console.log(this.usrName2) // 访问混入对象中的数据
  },
  created() {
    console.log('组件 created函数')
  }
}
</script>
```



### Vue中的数组

+ Vue中会对数组做改造：

![image-20220225114345362](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220225114345362.png)

### 插槽

> 疑问：父组件可以通过Props给子组件传数据，那能否直接传标签呢？
> 回答：能 -> 插槽

+ 作用：父组件给子组件传标签，替换掉 子组件中的 `"slot占位符"`
+ 分类：默认插槽 ， 具名插槽 ， 作用域插槽

#### 默认插槽

![image-20220406183524594](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220406183524594.png)

#### 具名插槽

![image-20220406183357142](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220406183357142.png)

#### 使用template

![image-20220406183249660](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220406183249660.png)

### $set

> 疑问：当修改 数组中的 数值时，未更新到视图

+ 分析：
  + Vue实例data中的数据，会被 Vue 进行改造，加入数据劫持
  + 所以一旦发生修改，Vue通过属性的set方法会知道的
  + 一旦知道数据改变，就会 生成新的 虚拟dom与旧虚拟dom进行对比，找出不同点，并最后更新到 真实dom树
+ 原因：
  + Vue 对 data中数组的 值类型元素，没有做 数据劫持
  + 所以，当 数组中的 值类型元素 改变时，Vue不知道！
+ 解决方案：
  + `Vue实例.$set(要修改的数组 , 元素下标 ，新的值)`

```js

<ul>
 <li v-for="age in ageList" :key="age">{{ age }}</li>
 <li><button @click="change2">改成108</button></li>
</ul>

ageList: [1, 2, 3, 4, 5, 6, 7, 78, 8],
    
// 2.将 8 改成108
change2() {
 this.$set(this.ageList, this.ageList.length - 1, 108); // 修改数据并更新视图
 //this.ageList[this.ageList.length - 1] += 100; // 可以修改数据，但不会更新视图
},
```



### scoped组件局部样式

#### 原理

+ 为什么要用？`就是想要 组件样式 只作用于 当前组件的标签`

+ 页面中样式，如果只想用于 当前 组件，则可以使用 **scoped 属性**
+ 原理：
  + 根据 当前组件文件名字 生成一个 **hash 值**
  + 为 组件中 的 选择题 添加一个 **属性选择器**，使用 **hash值**
  + 为 组件中所有标签 都添加一个 属性，使用 **hash值**

![image-20220311100922909](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220311100922909.png)

#### 作用于子组件根标签

+ 注意：子组件 的 根标签 也会被 添加 父组件的 hash值属性，所以 也能使用父组件的局部样式

![image-20220311102627650](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220311102627650.png)

### 深度选择器

+ 作用：如果 想在 scoped 样式 作用域 子组件的 标签，就需要使用 深度选择器
+ 语法： /deep/ 

```css
<style scoped lang="less">
/deep/ div {
  border: 2px dashed red;
}
</style>
```

#### 原理

+ 前置 生成 属性选择器 的 位置

![image-20220311104011978](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220311104011978.png)



### MVVM模型

![查看源图像](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/77ffe1c57761e5a9598115b1059fdf3c.png)

### Vue数据平铺

> Vue 在实例化过程中，会讲配置对象的成员头添加到 当前组件对象上

![image-20220328181345767](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220328181345767.png)

### 数据劫持

+ 概念：针对 对象属性的 访问 和 修改，做拦截操作，以达到 增加业务 和 修改返回值 的 效果
+ 实现机制：
  + `Object.definedProperty`
  + `Proxy 代理`

#### Object.definedProperty

+ 可以通过 它 为 对象的 属性 添加 `描述(特性)`
  + value：属性值 - 不能和get/set同时存在
  + enumerable：配置当前属性 是否可以被 循环
  + writable：配置当前属性 是否可以被修改
  + configurable：配置当前属性 是否可以被 重新配置描述
  + get 方法： 数据劫持，访问属性时，会直接调用 get方法
  + set 方法： 数据劫持，修改属性时，会直接调用 set方法
+ 本质：就是为 对象的属性 添加一个 附属的 **描述对象**，告诉js引擎这个属性特殊操作

![image-20220303140341542](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220303140341542.png)

+ **使用 闭包中的变量 来保存 属性数据**
  + 一旦为对象.属性 添加 get/set后，就无法直接访问属性值
    也无法访问 描述对象 里的 value，那 get/set 的值应该从哪存/取呢？
  + --> 使用 函数的 形参/局部变量 (闭包)

![image-20220303140504599](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220303140504599.png)

+ 案例：劫持属性更新dom

![image-20220304094857871](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220304094857871.png)

#### 数据代理Proxy

> **Proxy** 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）

![image-20220304094949829](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220304094949829.png)

```js
let obj = { id: 1, sex: '男', age: 11 }

let p1 = new Proxy(obj, {
    get: function (target, prop) {
        // console.log('get----------')
        return target[prop]
    },
    set: function (target, prop, val) {
        // console.log('set----------', target, prop, val)
        if (prop === 'age') {
            if (val <= 0 || val > 100) {
                throw new Error('人类年龄必须 >0 <=100')
            }
            target[prop] = val
        } else
            target[prop] = val
        // return val
    }
})

// 通过代理 对象.属性 来 设置 obj的值：会调用 set方法，并传入 obj，属性名,属性值
p1.name = 'ruiky'
p1.age = 18

console.log(obj)
```

+ 两种数据劫持方式的区别？
  + Object.definedProperty 是直接 劫持 目标对象 本身！
  + Proxy 是通过代理对象 来 维护目标对象，而不会直接影响它

### 发布订阅模式

> 发布-订阅模式其实是一种对象间一对多的依赖关系，当一个对象的状态发送改变时，所有依赖于它的对象都将得到状态改变的通知。

+ 订阅者（Subscriber）把自己想订阅的事件注册（Subscribe）到调度中心（Event Channel），当发布者（Publisher）发布该事件（Publish Event）到调度中心，也就是该事件触发时，由调度中心统一调度（Fire Event）订阅者注册到调度中心的处理代码。

```js
// 1.创建依赖中心-----------------
const Dep = {
    // 收集依赖 的 对象
    clientList: {}, // {'张三':[fn1,fn2],'李四':[fn3,fn4], '王五':[]}
    // 添加依赖 (key，订阅者方法)
    listen: function (key, fn) {
        // 如果 是 客户端A首次 添加依赖，则 在 依赖对象中 添加 客户端A 和 对应的 方法数组
        (this.clientList[key] || (this.clientList[key] = [])).push(fn)
    },
    trigger: function () {
        let key = Array.prototype.shift.call(arguments)
        let fns = this.clientList[key]
        if (!fns || fns.listen === 0) {
            return false
        }
        for (let i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments)
        }
    }
}

// e.添加依赖
Dep.listen('zs', function (text) {
    console.log(text)
})

 // d.触发 依赖
Dep.trigger(tag, val)

```



### vue脚手架 与 vue.js

![image-20220225140800747](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220225140800747.png)

### $nextTick

> Vue中，如果想 在数据改变后获取更新后的dom，需要通过$nextTick函数等一下，否则很可能拿到的是旧的dom

+ 为什么要用？
  + 在vue 中 data数据 发生改变时，会自动更新视图中的dom
  + 但是，这中间需要经过 数据修改之前 和 修改之后 的 两套 虚拟DOM 的对比，找出不一样的地方
  + 然后，再根据不一样的地方，更新视图的dom
  + 问题来了，如果 想在 函数中 修改 data数据 后，立即获取修改数据后的 dom
+ 解决方案：
  + 思路，在修改了data数据后，要等待vue更新真实dom后，再去获取修改后的dom
  + 方案：将 获取 dom的代码 放到 $nextTick(function(){  // 获取真实dom  })

![image-20220221154400359](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220221154400359.png)

### webpack

### 前端项目优化

+ 按需加载(路由懒加载)
+ 参考：[讲义->专题->二.web性能优化->webpack优化->按需加载(路由懒加载)](#lazyloader)

### Vue生命周期

![image-20220328154351013](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220328154351013.png)

+ **生命周期：**Vue实例或VueComponent实例 创建 到 销毁的过程！
  + 创建
    + Vue实例 -> `main.js` 中创建
    + Vue组件实例 -> 路由管理器 在 路由表中 找到 匹配的 path时，创建 这个 组件对象
  + 销毁
    + Vue实例 -> 关浏览器窗口
    + Vue组件实例 -> this.$destroy() / v-if / 切换匹配路由 对应组件时

+ **Vue钩子函数：**
  + 概念：由程序员 编写 并 挂载到Vue对象上，由Vue框架在 固定的时候 调用的函数！
  + 钩子函数：4个阶段，8个函数 + 2个缓存相关钩子函数
    + beforecreate
    + created -> 可以最早 访问到   data数据和 methods 方法等配置成员
    + beforemoute
    + mouted -> 可以最早 获取 dom元素或 组件对象
    + beforeupdate -> 在 由数据改变 引发视图 更新之前 执行
    + updated -> 在 由数据改变 引发视图 更新之后 执行
      + 联想： this.$nextTick方法
    + 一旦：组件.$destory() / v-if / 路由切换组件时
      + beforeDestory
      + destroyed 
    + 补充：被 keep-alive 组件管理的 子组件，会有两个多的钩子函数
      + activeted -> 从 缓存中 渲染到 页面中时，执行
      + deactiveted -> 将 页面中组件 移除，保存到 缓存中时，执行
  
+ 问题1：为什么一般要在 created 里 发送 axios请求呢？

  + created -> 也被叫做 组件的 入口函数！

  + 答：
  + a.因为 很多接口 需要参数，而这些数据 常放在 Props和data中，所以必须要等能访问到这些数据时，再发送请求，否则 请求中 获取不到参数，导致接口执行失败！
  + b.之所以 一般放在 created 函数的原因，是因为此时是整个生命周期最早能访问到 data/props数据的时机！

![image-20220328160457649](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220328160457649.png)

### 父子组件钩子执行顺序

![image-20220328163603988](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220328163603988.png)

### Vue的key

+ vue 中使用 `v-for` 循环时，要求指定 `key` 属性
+ 原因：
  + 如果 不加 key，一旦数组插入新元素，vue无法定位下标，只能在最后新增一个元素，并依次修改属性值
    + 导致问题：更新的dom较多
  + 如果 加key，可以直接定位下标，在 对应的 dom前面 插入新元素，不需要 改变其他dom的属性值
    + 解决：由于根据下标找到要更新的dom，所以更新的dom少

![image-20220307113955557](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220307113955557.png)

### 双向数据绑定

+ 是指的：
  + 当 **data数据** 发生改变时，自动将数据更新到 绑定的**表单元素.value**中
  + 当**表单元素的值**被用户改变时，自动将 **表单元素的value值** 传给 **data数据**

![image-20220222141940443](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220222141940443.png)

+ Object.definedProperty() 

### v-model 原理

> v-model 是vue双向数据绑定的指令，能将试图中表单元素的值 同步更新到 指定data属性，也会在更新data时，更新页面上表单元素的值

+ 分两个层面：
  + 思路层面：父组件 将 data 通过 props传给子组件，子组件通过 自定义事件 讲数据传给父组件
  + 技术层面：
    + 父组件 data一旦发生修改，是通过 props传给子组件的(vue自动实现)
    + 子组件内部 的 dom值一旦改变，会触发 input 事件，然后将值设置给 子组件data，而子组件内部对data做数据劫持(set/get)，在其中的 set 内部 通过 $emit 触发自定义事件，进而将新的值传给父组件
+ 代码：(注意：没有使用 数据劫持)

![image-20220505120244627](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220505120244627.png)

+ **注意：v-model 为不同的表单元素 使用不同 属性 和 事件**
  + text 和 textarea 使用 value 属性和 input 事件
  + checkbox 和 radio 使用 checked 属性和 change 事件
  + select 字段将 value 作为 prop 并将 change 作为事件

### 子组件中二次v-model

> 移动端项目开发时，有时会针对 vant组件 做二次封装，而其中就会出现 v-model 的二次绑定需求！

+ 需求：将 弹出层 **van-popup组件**，封装成一个自己的 **弹层组件2**
  + 父组件 将 **data.isShow** 绑定到 弹层组件2的 **props.show** 属性
  + 子组件 中 再根据 props.show 控制 **van-popup组件** 的显示和关闭
+ 问题：

![image-20220505182718378](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220505182718378.png)

+ 解决方案：子组件中 让 **van-popup组件** 对计算属性做 双向数据绑定 

![image-20220505172218151](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220505172218151.png)

### data和prop优先级

+ **结论：** beforeCreate ->inject -> Props -> Methods -> Data -> Computed -> Watch ->provide-> created

+ 查看源码

```js
/**
 * @description: 初始化数据 响应式原理的入口
 * @param {*} vm 实例Vm
 */
export function initState (vm: Component) {
  // 为当前组件创建了一个watchers属性，为数组类型  vm._watchers保存着当前vue组件实例的所有监听者（watcher）
  vm._watchers = []
  // 从实例上获取配置项
  const opts = vm.$options
  //如果vm.$options上面定义了props 初始化props 对props配置做响应式处理  
  //代理props配置上的key到vue实例,支持this.propKey的方式访问
  if (opts.props) initProps(vm, opts.props)
  //如果vm.$options上面定义了methods 初始化methods ,props的优先级 高于methods的优先级
  //代理methods配置上的key到vue实例,支持this.methodsKey的方式访问
  if (opts.methods) initMethods(vm, opts.methods)
  //如果vm.$options上面定义了data ,初始化data, 代理data中的属性到vue实例,支持通过 this.dataKey 的方式访问定义的属性
  if (opts.data) {
    initData(vm)
  } else {
    //这里是data为空时observe 函数观测一个空对象：{}
    observe(vm._data = {}, true /* asRootData */)
  }
  //如果vm.$options上面定义了computed 初始化computed
  //computed 是通过watcher来实现的,对每个computedKey实例化一个watcher,默认懒执行.
  //将computedKey代理到vue实例上,支持通过this.computedKey的方式来访问computed.key
  if (opts.computed) initComputed(vm, opts.computed)
  //如果vm.$options上面定义了watch 初始化watch
  if (opts.watch && opts.watch !== nativeWatch) { 
    // 判断组件有watch属性 并且没有nativeWatch（ 兼容火狐）
    initWatch(vm, opts.watch)
  }
}
```



### 虚拟Dom

####  为什么要有虚拟DOM？

+ 回答：
  + 由于 Vue 大多数情况下 不需要程序员直接操作 dom对象，而是直接操作 data数据
  + 当数据改变后，由 Vue自动 更新到 视图中
  + 但是 Vue如何确定哪些 dom需要更新呢？
+ 解决方案：
  + 在 **data数据** 发生 **改变前** 和 **改变后** ，生成两颗 **虚拟dom树**，对比 每一个节点的属性，是否有不同
  + 如果有，就可以定位成 发生改变的dom，从而更新到 **真实dom**中影响页面显示
  + 注意：虚拟dom的属性很少，对比时遍历效率高；真实dom属性太多，对比时性能很低

![image-20220222145832823](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220222145832823.png)

#### 虚拟dom是什么

+ html标签

```html
<div id="msgbox">
    今晚的月亮真圆啊
    <p>讨厌，死鬼</p>
</div>
```

+ **真实dom，有200-300多属性(含事件属性)！**

![image-20220509093437491](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220509093437491.png)

+ 虚拟DOM就是一个简化的对象，属性很少！

```js
let vNode = {
    tag: 'div',
    props: { id: 'msgbox' },
    context: '今晚的月亮真圆啊',
    children: [
        {
            tag: 'p',
            props: {},
            context: '讨厌，死鬼',
            children: []
        }
    ]
}
```

### Diff算法

> Diff算法实现的是最小量更新虚拟DOM

#### Diff 粒度

![image-20220509140823977](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220509140823977.png)、

#### 组件 Diff

+ **组件差异对比** 是数据层面的差异比较
+ 如果都是同一类型的组件
  + 两节点是同一个组件类的两个不同实例，比如：
    `<div id="before"></div>` 与 `<div id="after"></div>`，按照原策略继续比较 VDOM树 即可
  
+ 如果出现不是同一类型的组件，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点

### 元素 Diff

+ **元素差异对比** 是真实DOM渲染，结构差异的比较
+ 首先进行第一层比较，如果相同元素，不操作；然后进入下一层比较，如果不一样，则按情况操作。
  
+ 当节点处于同一层级时，Diff提供三种操作：**删除**、**移动**、**插入**。



#### Diff算法流程

+ 主要分3个函数：
  + patch函数
  + patchNode函数
  + updateChildren函数

+ 图解：

![image-20220509140710690](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220509140710690.png)

+ 名词解释：
  + **旧前**是`更新前`虚拟DOM 中的头部指针
  + **旧后**是`更新前`虚拟DOM 中的尾部指针
  + **新前**是`更新后`虚拟DOM 中的头部指针
  + **新后**是`更新后`虚拟DOM 中的尾部指针

+ 图解

![image-20220509163549552](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220509163549552.png)

#### Diff源码节选

+ patch函数
  + 找到对应的真实dom，称为el
  + 判断Vnode和oldVnode是否指向同一个对象，如果是，那么直接return
  + 如果他们都有文本节点并且不相等，那么将el的文本节点设置为Vnode的文本节点。
  + 如果oldVnode有子节点而Vnode没有，则删除el的子节点
  + 如果oldVnode没有子节点而Vnode有，则将Vnode的子节点真实化之后添加到el
  + 如果两者都有子节点，则执行updateChildren函数比较子节点

```js
function patch (oldVnode, vnode) {
    // .......
    // 如果 两个vnode 相同 
    if (sameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode)
    } else {
        const oEl = oldVnode.el // 当前oldVnode对应的真实元素节点
        let parentEle = api.parentNode(oEl)  // 父元素
        createEle(vnode)  // 根据Vnode生成新元素
        if (parentEle !== null) {
           api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl)) // 将新元素添加进父元素
           api.removeChild(parentEle, oldVnode.el)  // 移除以前的旧元素节点
           oldVnode = null
        }
    }
    // ...... 
    return vnode
}

patchVnode (oldVnode, vnode) {
    const el = vnode.el = oldVnode.el
    let i, oldCh = oldVnode.children, ch = vnode.children
    if (oldVnode === vnode) return
    if (oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text) {
        api.setTextContent(el, vnode.text)
    }else {
        updateEle(el, vnode, oldVnode)
        if (oldCh && ch && oldCh !== ch) {
            updateChildren(el, oldCh, ch)
        }else if (ch){
            createEle(vnode) //create el's children dom
        }else if (oldCh){
            api.removeChildren(el)
        }
    }
}
```

+ updateChildren函数

> 核心函数，主要负责旧虚拟节点和新虚拟节点均存在子元素的情况，按照比较策略依次进行比较，最终找出子元素中变化的部分，实现最小更新。

```js
function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    var canMove = !removeOnly;
    {
        checkDuplicateKeys(newCh);
    }
    // oldVnode起始位置小于结束位置并且newVnode起始位置小于结束位置
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        // isUndef 用来判断对象是否等于undefined或者为空，是的话返回true
        if (isUndef(oldStartVnode)) {
            // oldVnode 起始位置oldS++
            oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
        } else if (isUndef(oldEndVnode)) {
            // oldVnode 结束位置oldE--
            oldEndVnode = oldCh[--oldEndIdx];
        } else if (sameVnode(oldStartVnode, newStartVnode)) {
            // oldS和newS相同，不变化，进行patch，oldS++，newS++
            patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
            // oldE和newE相同，不变化，进行patch，oldE--，newE--
            patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
            // oldS和newE相同，oldS移动到oldE之后，进行patch，oldS++，newE--
            patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
            canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
            // oldE和newS相同，oldE移动到oldS之前，进行patch，oldE--，newS++
            patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        } else {
            // 全都不相同情况下
            // 获取oldVnode->index的key
            if (isUndef(oldKeyToIdx)) {
                oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); 
            }
            idxInOld = isDef(newStartVnode.key)
                ? oldKeyToIdx[newStartVnode.key]
            : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
            if (isUndef(idxInOld)) { // New element
                // oldVnode->index为undefined或null，说明没有该元素，创建新的元素
                createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
            } else {
                // 获取oldVnode
                vnodeToMove = oldCh[idxInOld];
                if (sameVnode(vnodeToMove, newStartVnode)) {
                    // 创建的Vnode和newS相同，插入到oldS之前，进行patch
                    patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
                    oldCh[idxInOld] = undefined;
                    canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
                } else {
                    // 相同的key但是不一样的element. 被视为新的element
                    createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
                }
            }
            newStartVnode = newCh[++newStartIdx];
        }
    }
    // 当oldS>oldE时，将newS至newE间的全部插入
    if (oldStartIdx > oldEndIdx) {
        refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
        addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
        // 当newS>newE，将oldS至oldE间的全部删除
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
}
```



### VueRouter

### Vuex与Pinia

#### Vuex

> 每一个 Vuex 应用的核心就是 store（仓库）。“store”是一个容器，包含着你的应用中大部分的**状态 (state)**

+ 官网：https://vuex.vuejs.org/zh/guide/

+ Vuex 和单纯的全局对象有以下两点不同：

  + Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
  + 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地**提交 (commit) mutation**。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

+ 原理图

  ![查看源图像](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/vuex%E7%BB%93%E6%9E%84%E5%9B%BE.png)

#### Pinia

> Pinia 是一个用于 Vue 的状态管理库，类似 Vuex, 是 Vue 的另一种状态管理方案

+ 官网：https://pinia.vuejs.org/
+ 特点：
  + 支持 Vue2 和 Vue3
  + 全面支持 TypeScript
  + 符合直觉，易于学习
  + 极轻， 仅有 1 KB
  + 模块化设计，便于拆分状态
+ 参考学习：https://www.php.cn/vuejs/488613.html

### UI框架



## 6.项目业务--------------------

### token机制

+ 作用：解决http协议无状态的 **身份验证机制**
  + 服务器端 在验证用户身份后，生成的加密token字符串，发给浏览器保存
  + 浏览器之后每次请求服务器接口，都将token带到请求头中，发给服务器
  + 服务器验证是否有token和是否失效，如果正常，则继续执行被请求接口业务，否则 返回401

![image-20220312140642742](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220312140642742.png)



![image-20220312140706847](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220312140706847.png)

### refresh_token

+ 背景：

  + 用户使用 token 机制 进行身份认证
  + 但 token 一般都会带失效时间，失效后：
    + 方案一：跳转到 登录页面，请用户重新登录
    + 方案二：通过refresh_token 重新 请求服务器生成新的 token，再请求上一次接口

+ 技术：

  + token 失效时间 较短，一般是 2-24小时
  + refresh_token 失效时间 较长，一般 1-14天

+ 配图：

  + 方案一：重新登录

  ![image-20220302141259857](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220302141259857.png)

  + 方案二：请求新的token

![image-20220302141318970](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220302141318970.png)

### 实时更新订单数据

+ 系统后台要能实时看到 最新的 订单，方便计时备餐
+ 技术: websocket   
+ 业务流程：
     a.点餐客户端(页面)，将 订单数据 发给 服务器
     b.备餐客户端(页面) 的厨房服务员 需要 看到最新订单
     c.所以服务器 会主动 将 最新订单 推送给 备餐客户

![image-20220228113312268](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220228113312268.png)

## 7.补充知识--------------------

### http状态保持

#### cookie机制

![image-20220304094603893](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220304094603893.png)

#### session机制

![image-20220304094623045](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220304094623045.png)

### 浏览器数据库

#### indexDB

+ 官网：[IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)
+ 特点：
  + **LocalStorage** 存储较少量的数据很有用但对于存储更大量的结构化数据来说力不从心
  + **键值对储存**
  + **异步**
  + **支持事务**
  + **同源限制**
  + **储存空间大**
  + **支持二进制储存**

### web服务器基本流程

![image-20220406184431639](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220406184431639.png)

### 翻墙

![image-20220330181303577](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220330181303577.png)

### 线程是什么？

+ 线程是一个存储单位，本身不会做任何事情
+ 工作原理：
  + cpu的分时调度机制，每隔20毫秒 会 切换任务(线程)执行
  + 切换时，需要保存 当前的执行上下文（哪个函数/第几行/局部变量）
  + 下次再分配到这个任务(线程)时，会从线程中 读取 行号和变量值，接着往下执行！
+ 生活案例：
  + 一个人 要吃5个包子，吃到第3个时，要去喝水，就喝了半杯
  + 接着再回去接着吃从第3个包子开始吃，吃完了
  + 再去接着喝剩下的半杯水

![image-20220222110147961](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220222110147961.png)

### socket

> 浏览器 和 服务器 交互的底层，用到了 **socket**

+ http协议 使用了 socket 的 tcp 协议：
  + 服务端：
    + 开启 **监听套接字**，负责 监听 浏览器的请求
    + 一旦 有浏览器 请求连接，**监听套接字** 就创建一个 **通信套接字**
  + 浏览器：
    + 使用 **通信套接字** 向服务器发起连接请求
    + 连接建立后，与 服务端 分配的专属 **通信套接字** 进行 报文通信（请求/响应报文）

![image-20220228175322938](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220228175322938.png)

### websocket

+ 专题：[【websokect】](./11WebSocekt/websocket.md)


![image-20220420174241505](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220420174241505.png)

### vscode保存时格式化

![image-20220228182411269](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220228182411269.png)

### eslint 深入

#### 1.为什么要用eslint

> 一句话：用来统一 代码风格规范的 工具

+ 背景：
  + js引擎只会对 语法规则 做检查，eg：变量名 不能用 数字开头 `let 0abc;`
  + 但是，这些规则太少了，现在前端项目又非常庞大，参与开发的人也很多，大家如果没有一套标准的代码规则，容易导致代码相互可读性差，兼容性也差
+ 解决思路：
  + 大家一起设置一套 规则更多的 规范！并且 要求所有开发人员 严格遵守
+ 问题：
  + 遵守起来太难，很多人记不住那么多规范
  + 检查起来太难，很麻烦
+ 最终解决方案：
  + 使用工具来检查，并且 帮助报错 和 修复

#### 2.eslint 的相关

+ 文章讲义：https://juejin.cn/post/7037426216671903780
+ 配置文件：`.eslintrc.js`
  + 使用 **extends 节点** 选择 需要的合适的 **规范套装**
  + 使用 **rules 节点**，局部覆盖修改 **规范套装** 里的详细规则

#### 3.rules根据条件赋值

![image-20220302104351714](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220302104351714.png)



### eslint+vetur 格式化代码

> 前面了解了 eslint 后，怎么融合到vue项目中来呢？
> 目标：能检查代码，也能在保存文件时，自动按照规范修复代码！

#### 相关插件和模块

+ `eslint 包` ：编译时 对 项目代码 做规范检查的，同时 在编译时 也能直接修复代码
+ `vscode的 eslint 扩展工具`：写代码时，实时检查当前代码 是否 符合 eslint 规范，不符合则报错
+ `vscode的 vetur 扩展工具`：为 **.vue 文件** 做代码 着色，且 可以 调用 **prettier** 的插件 来格式化代码
+ `vetuer 内置的 prettier 插件`：用来格式化修改代码的！
  + prettier 官网 规范：https://prettier.io/docs/en/options.html

#### 保存时格式化js和ts

+ .js / .ts 文件，两种方式：配置 `默认格式化器` 或 配置 `eslint扩展工具` 来修复

##### 通过默认格式化器

![默认格式化器](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220301165951990.png)

##### 通过eslint扩展工具

```js
// 配置 vscode 保存时 使用 eslint扩展插件 来 检查和修复 js文件的语法规范错误
 "editor.codeActionsOnSave": {
   "source.fixAll.eslint": true
 }
```

![img](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/564148a18efa446a885dd7342a59858ctplv-k3u1fbpfcp-zoom-in-crop-mark1304000.webp)

#### 保存时格式化.vue

+ 设置 使用 prettier 来格式化修复 不同区域的 代码

![img](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/0c8c6d994be2410091d29d930fe80f9ctplv-k3u1fbpfcp-zoom-in-crop-mark1304000.webp)

##### 问题：和 eslint 不兼容

> prettier 有自己的一套规范！其中有和 eslint 不兼容的地方！

+ 解决方案有两种：
  + 直接 修改 prettier 的规范，是它和 eslint 规范 保持一致
  + 如果 prettier 不包含的规范，则 直接 将 eslint 中这条规范 给 关闭

##### 配置prettier

+ 配置文件： `.prettierrc.js`

```js
//此处的规则供参考，其中多半其实都是默认值，可以根据个人习惯改写
module.exports = {
    // printWidth: 80, //单行长度
    // tabWidth: 2, //缩进长度
    // useTabs: false, //使用空格代替tab缩进
    // semi: true, //句末使用分号
    singleQuote: true, //使用单引号
    // quoteProps: 'as-needed', //仅在必需时为对象的key添加引号
    // jsxSingleQuote: true, // jsx中使用单引号
    // trailingComma: 'all', //多行时尽可能打印尾随逗号
    // bracketSpacing: true, //在对象前后添加空格-eg: { foo: bar }
    // jsxBracketSameLine: true, //多属性html标签的‘>’折行放置
    // arrowParens: 'always', //单参数箭头函数参数周围使用圆括号-eg: (x) => x
    // requirePragma: false, //无需顶部注释即可格式化
    // insertPragma: false, //在已被preitter格式化的文件顶部加上标注
    // proseWrap: 'preserve', //不知道怎么翻译
    // htmlWhitespaceSensitivity: 'ignore', //对HTML全局空白不敏感
    // vueIndentScriptAndStyle: false, //不对vue中的script及style标签缩进
    // endOfLine: 'lf', //结束行形式
    // embeddedLanguageFormatting: 'auto', //对引用代码进行格式化
};
```

##### 配置eslint

+ 配置文件： `.eslintrc.js`

```js
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    // '@vue/eslint-config-standard'
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 配置 eslint 的 引号规范，使用 单引号，不然就报错！
    "quotes": ["error", "single"]
    // 设置 函数名与括号之间 不用空格
    'space-before-function-paren': 0
  }
}
```



### Promise原理

+ 手写promise

```js
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;

        // 存放成功的回调
        this.onResolvedCallbacks = [];
        // 存放失败的回调
        this.onRejectedCallbacks = [];

        let resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                // 依次将对应的函数执行
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }

        let reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                // 依次将对应的函数执行
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(onFulfilled, onRejected) {
        if (this.status === FULFILLED) {
            onFulfilled(this.value)
        }

        if (this.status === REJECTED) {
            onRejected(this.reason)
        }

        if (this.status === PENDING) {
            // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
            this.onResolvedCallbacks.push(() => {
                onFulfilled(this.value)
            });

            // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
            this.onRejectedCallbacks.push(() => {
                onRejected(this.reason);
            })
        }
    }
}
```

### web容器

![image-20220303140315268](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220303140315268.png)

### 服务器负载均衡

![image-20220406184127041](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220406184127041.png)

## 8.前端工程化------------------

### vue脚手架工作方式

![image-20220330180623981](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220330180623981.png)

### vue脚手架配置

#### 1.创建配置文件

+ `vue.config.js`

### nginx服务器

+ 生产环境服务器：nginx / canddy2

#### nginx介绍和安装

> 介绍：Nginx是lgor Sysoev为俄罗斯访问量第二的rambler.ru站点设计开发的。从2004年发布至今，凭借开源的力量，已经接近成熟与完善。
>
> Nginx功能丰富，可作为HTTP服务器，也可作为反向代理服务器，邮件服务器。支持FastCGI、SSL、Virtual Host、URL Rewrite、Gzip等功能。并且支持很多第三方的模块扩展。
>
> Nginx的稳定性、功能集、示例配置文件和低系统资源的消耗让他后来居上，在全球活跃的网站中有12.18%的使用比率，大约为2220万个网站。

<img src="assets/image-20220412154514156.png" style="width:500px"/>

+ 官网：http://nginx.org/
+ 安装：绿色免安装
  + 注意：解压路径 不能包含 中文 或 空格，建议 直接解压到 D:盘根目录使用！

#### 配置

+ 配置文件路径：`./conf/nginx.conf`

![image-20220412154722637](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220412154722637.png)

+ 基础配置

```conf
...  #全局块:配置影响nginx全局的指令。一般有运行nginx服务器的用户组，nginx进程pid存放路径，日志存放路径，配置文件引入，允许生成worker process数等。

#events块:配置影响nginx服务器或与用户的网络连接。有每个进程的最大连接数，选取哪种事件驱动模型处理连接请求，是否允许同时接受多个网路连接，开启多个网络连接序列化等。
events {
   ...
}
   
#http块:可以嵌套多个server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。如文件引入，mime-type定义，日志自定义，是否使用sendfile传输文件，连接超时时间，单连接请求数等。
http
{
    ...   #http全局块
    server  #server块:配置虚拟主机的相关参数，一个http中可以有多个server
    { 
        ... 
        location [PATTERN] #location块:配置路由，以及各种页面的处理情况
        {
            ...
        }
        location [PATTERN] 
        {
            ...
        }
    }
    server
    {
      ...
    }
    ...     #http全局块
}
```

#### 常用命令

首先进入**nginx安装根目录**，该目录下打开cmd命令行窗口，cmd窗口中执行nginx命令：

+ 使用**管理员权限**打开终端
+ 使用 `.\nginx` 代替 `nginx `

```js
// 查看帮助信息
nginx -h

// 查看nginx版本(小写字母v)
nginx -v

// 除版本信息外还显示配置参数信息(大写字母V)
nginx -V

// 启动nginx
start nginx

// 指定配置文件启动nginx
start nginx -c filename

// 关闭nginx，完整有序的停止nginx，保存相关信息
nginx -s quit

// 关闭nginx，快速停止nginx，可能并不保存相关信息
nginx -s stop

// 重新载入nginx，当配置信息修改需要重新加载配置是使用
nginx -s reload

// 重新打开日志文件
nginx -s reopen

// 测试nginx配置文件是否正确
nginx -t -c filename
```

#### 两种代理方案

+ 方案1：浏览器+web服务器(开发服务器)+代理服务器+接口服务器
  + 好处：不暴露 代理服务器 地址


+ 方案2：浏览器+代理服务器+接口服务器
  	好处：节点少、速度会快点、减轻web服务器压力、nginx代理服务器还可以做集群分布
  	缺点：暴露 代理服务器地址

![image-20220330180734739](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220330180734739.png)

### 正向代理/反向代理

正向代理：客户端人员 配置代理 -> 案例：翻墙
反向代理：服务器端人员 配置代理 -> 案例：两种代理方案

### SourceMap

#### js的SourceMap

+ 当前很多前端项目 都是基于 构建工具 将 项目代码 编译/压缩 后再部署给服务器，最后由浏览器请求并执行！
+ 问题：
  + 万一项目在浏览器端运行报错了怎么办？--> `调试`
  + 但是 压缩后的js文件代码，一行显示所有代码；变量名都换成了 a/b/c......
+ 解决方案：
  + 提供一套 能 帮助 调试 的 js 文件！

#### css的SourceMap

+ 当前很多项目 将 导入的 n个 css 文件 混编成 1个css文件
+ 问题：
  + 当 程序员 在浏览器 要调试样式时，需要 知道被修改的样式 在 哪个 具体的 css文件中
  + 所以 需要 使用 SourceMap 的 css版，方便在调试的时候  看到  样式 具体来自哪个css文件！

## 9.代码工具和插件------------

### codemirror代码编辑器

![image-20220407143955411](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220407143955411.png)

+ 官网：https://codemirror.net/doc/manual.html#config
+ 功能：提供 在网页中 编写 和 展示 各种编程语言的 在线编辑器
+ 下载：`yarn add codemirror `
+ 代码：

```vue
<template>
  <div id="app">
      <h1>在线编辑器123</h1>
      <codemirror
        ref="cm"
        v-model="codeStr"
        :options="cmOptions"
        @input="inputChange"
      ></codemirror>
  </div>
</template>

<script>
// 引入vue-codemirror
import { codemirror } from 'vue-codemirror'
// 引入css文件
import 'codemirror/lib/codemirror.css'
// 引入主题 可以从 codemirror/theme/ 下引入多个
import 'codemirror/theme/idea.css'
// 引入语言模式 可以从 codemirror/mode/ 下引入多个
import 'codemirror/mode/javascript/javascript.js'
    
export default {
  name: 'App',
  components: {
    codemirror
  },
  data() {
        return {
            codeStr:
            'console.log("123")\nfor(let i = 0;i<=10;i++){\n   console.log(i)\n}',
            cmOptions: {
                // 语言及语法模式
                mode: 'text/javascript',
                // 主题，注意，必须和 导入的 主题包css 同名
                theme: 'idea',
                // 设置为只读模式
                readOnly: false,
                // 显示行数
                line: true,
                lineNumbers: true,
                // 软换行
                lineWrapping: true,
                // tab宽度
                tabSize: 4
            },
        }
  },
   methods: {
       // 输入事件
       inputChange(content) {
           this.$nextTick(() => {
               console.log('code:' + this.code)
               console.log('content:' + content)
           })
       }
   },
</script>
```



### markdown编辑思路

+ 使用 在线markdown编辑器 来编写 和 预览 md语法的文章
+ 使用 marked 将 md语法 转成 html标签语法的文章
+ 将  html标签语法的文章 发给服务器 保存起来
+ 浏览器 将来 查看文章，服务器 返回  html标签语法的文章 给浏览器查看

#### 在线md编辑器

+ **mavon-editor**：https://www.npmjs.com/package/mavon-editor
+ 在线学习文章：[推荐](https://blog.csdn.net/suo082407128/article/details/99327138)

![image-20220407154942081](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220407154942081.png)

#### md语法转换器

+ 转换器推荐：Marked 
+ 官网：https://marked.js.org/#installation

+ 需求：编辑文章结束后，要保存到服务器，那么 需要保存 两种格式的 文章内容
  + md语法格式：将来 编辑文章时，要读取 并返回给浏览器
  + html语法格式：将来 查阅文章时，直接 返回 给浏览器

![image-20220407155258020](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220407155258020.png)

+ 使用语法：

  + 安装： `yarn add marked`  or `npm i marked`
  + 导入 并 使用：

  ```vue
  <template>
    <div id="app">
      <h1>在线 md 编辑器:</h1>
      <mavon-editor v-model="mdStr" />
      <h1>编辑器内容转成html之后展示区域：</h1>
      <div ref="conBox" v-html="htmlStr"></div>
    </div>
  </template>
  
  <script>
  // 1.导入 marked
  import { marked } from 'marked'
  export default {
    name: 'App',
    components: {},
    data() {
      return {
        // 同步 在线编辑器中的 markdown 语法的字符串
        mdStr: ''
      }
    },
    computed: {
      // 2.计算属性中：调用marked包 将 md语法 转成 html标签
      htmlStr() {
        return marked.parse(this.mdStr)
      }
    }
  }
  </script>
  
  <style lang="less">
  </style>
  
  ```

  + 详细使用播客：https://www.cnblogs.com/djtao/p/6224399.html



### 无后台评论系统

+ 作用：一款快速、简洁且高效的无后端评论系统

+ 官网：https://valine.js.org/

### AI代码插件

+ 官网：https://copilot.github.com/

+ 功能：帮助程序员编写代码！

+ 注意：需要先点击安装后的提示 来 登录提交申请，等确认后才能工作！

  ![image-20220407091256067](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220407091256067.png)

## 10.前端网络安全--------------

### SQL注入

+ 本质：后台 sql字符串的查询条件 是 拼接上去的，这样就容易 被 恶意用户 提交 后面半部分 恶意sql语句，造成数据库的安全隐患！甚至可能丢失 sql数据库 管理员权限，从而 丢失 操作系统权限！

```js
let uName ="james"
let uPwd = "123"
// 错误方式！容易被 sql注入！
let strSql = "select * from users where uname ="+ uName +"  and upwd ="+uPwd
```

+ 防止sql注入，必须在 服务器端 来采取措施：
  + 不要 使用 字符串 拼接的方式 来 构造 `sql语句`

![image-20220408102333277](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220408102333277.png)

### XSS攻击

+ 本质：提交 包含 script 标签的 恶意脚本内容到服务器数据库，读取后会被浏览器端执行恶意代码
+ 推荐阅读：https://zhuanlan.zhihu.com/p/101300360

![image-20220408091314832](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220408091314832.png)

+ 解决方案：
  + 遇到 script 标签，就将他们的 > 和 <  转成 `&gt;`  和  `\&lt; `
+ 模拟图：

![image-20220408103050764](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220408103050764.png)

### CSRF攻击

+ 跨站请求伪造(Cross-site request forgery)

+ 本质：恶意网站 控制 浏览器，并利用浏览器的身份 在 目标网站 做操作

  比如以你的名义发送邮件、发消息，盗取你的账号，添加系统管理员，甚至于购买商品、虚拟货币转账等

+ 推荐阅读：https://zhuanlan.zhihu.com/p/114750961

![image-20220408092028605](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220408092028605.png)

+ 解决方案

  + 方案一：reffer判断

    ![image-20220408104702294](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220408104702294.png)

  + 方案二：token判断

    + 由于 cookie 会被 浏览器 自动保存 和 读取 并 发送到 相同服务器，
    + 所以 我们可以 使用 token 来认证
    + 浏览器 不会 自动读取 token 发到服务器，需要 程序员 手动读取 token，再加入请求报文发送
    + 而 恶意网站的 302 状态码 控制浏览器跳转时，是无法 自动读取 token 的！
    + 这样，服务器 只需要检查 看 请求中 是否包含 token，就可以避免 CSRF攻击！

### DDos攻击

+ 分布式拒绝服务攻击(Distributed Denial of Service)
+ 本质：攻击者利用“肉鸡”对目标网站在较短的时间内发起大量请求，大规模消耗目标网站的主机资源，让它无法正常服务。

![image-20220408093046759](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220408093046759.png)

### DNS劫持

+ DNS：域名解析服务器 (Domain Name System)

+ 本质：又称域名劫持,通过某些手段取得某域名的解析控制权，修改此域名的解析结果，导致对该域名的访问由原IP地址转入到修改后的指定IP

![image-20220408112916180](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220408112916180.png)

![image-20220408094636348](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220408094636348.png)

### TCP劫持

+ 本质：篡改TCP数据包内容
+ 推荐阅读：https://blog.csdn.net/qq_41959899/article/details/104905317

![image-20220408095618890](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220408095618890.png)

### 端口扫描技术

+ 本质：就是扫描目标机器的端口，找到漏洞来攻击
+ 详细：
  + 步骤1.扫描 知名软件的 端口号，只要扫描到某个端口 有 回应，则说明 安装了这个软件
  + 步骤2.通过 这个软件的 漏洞 来 攻击电脑，获取权限！



## 11.密码学---------------------

### 对称加密

+ 参考 专题 https.2.1 对称加密

### 非对称加密

+ 参考 专题 https.2.2 非对称加密

### 秘钥交换

![image-20220408115340865](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220408115340865.png)

### hash算法

> **指纹摘要算法**：世界上没有两片完全相同的叶子，提取叶子的特点就是摘要

+ 目的：是为 任何数据 在 任何时候 都能生成 唯一的 “id”
+ 特点：只要数据不变，生成的永远是相同的 "id"

#### 介绍

+ hash算法：可以将任意数据 生成 固定长度 的 16进制 字符串 【[在线工具](http://tool.oschina.net/encrypt?type=2)】

  并且，只要数据一样，那么不管计算多少次都会获得同一个 16进制 字符串

+ 常见hash算法：**md5，sha1，sha256，sha512 等，都是摘要算法(Message Digest)**

  如：

  ![1535684187189](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/1535684187189.png)


#### 特点

+ 碰撞可能性：不同内容生成同一个hash值的可能性

  比特币用sha256算法：

  2的256次方 ->  1.157920892373162e+77  -> 比已探明宇宙中原子的数量还多

  > 转成 二进制 就是 256位的数值  **(1个十六进制数 得用 4个二进制数 表示) **

  **64个十六进制数**
  96DBE8599CCA83C9487B39FF14D6A224B488E9AC8A676DEBCC0DFAC53615208B
  ​	   |

  **256个二位数**
  1001011011011011  1110100001011001
  1001110011001010  1000001111001001
  0100100001111011  0011100111111111
  0001010011010110  1010001000100100
  1011010010001000  1110100110101100
  1000101001100111  0110110111101011
  1100110000001101  1111101011000101
  0011011000010101  0010000010001011

+ 不可逆

  ![1535686810813](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/1535686810813.png)

#### 破解方式

+ 暴力穷举 【[在线工具](http://cmd5.com/)】

  ![1535686650110](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/1535686650110.png)

+ 小结：为了安全起见，现在一般使用 sha256 算法



## 12.http协议版本-------------

#### http对比

+ Http协议 是 浏览器 和 服务器 之间通信的 协议规范！
  + **报文**格式协议
  + **连接**协议规则

##### http1.0

+ 每次请求一个资源，就要建立一个tcp连接，拿到资源后就立即销毁！
+ 缺点：在web2.0网页中，页面包含很多图片和外部资源，要建立很多次tcp连接，严重影响性能！

![image-20220424093956743](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220424093956743.png)

##### http1.1

+ 提供 长链接模式(conection:keep-alive)，允许使用一个连接通道 **串行**发送多次请求！
+ 缺点：**对头阻塞问题**，只能依次请求，上次请求没有完成之前，后面的请求必须排队！

![image-20220424094331301](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220424094331301.png)

##### http1.1 pipeline

+ http1.1 后期允许开启 pipeline机制，同时发送多个请求
+ 缺点：响应也是按发送顺序依次到达，依然存在 **对头阻塞问题**

![image-20220424100000468](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220424100000468.png)

##### http2.0

+ http2.0 使用**多路复用**，允许使用同一个连接通道，并发处理多个请求响应，且相互之间不受顺序影响
+ 特点：
  + 浏览器对**同一个域名**只建立一个TCP**通道**，所有http请求都通过这个通道完成。
  + 将每个请求报文切割为更小的片段，并且给同一个请求的片段分配相同的id，方便服务端识别组合

![image-20220424111900225](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220424111900225.png)

#### http趣图对比

![image-20220424105000372](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220424105000372.png)

##### 

# 专题====================

## 一.https-------------

### 1.网络传输的安全性

+ http 协议：不安全，未加密
+ https 协议：安全，对请求报文 和 响应报文 做加密

![image-20211129182424353](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20211129182424353.png)

### 2.对称加密与非对称加密

#### 2.1 对称加密

+ 特点：

  + 加解密使用 **相同** 秘钥
  + 高效，适用于大量数据的加密场景
  + 算法公开，安全性取决于秘钥大小，但秘钥越大效率越低，需要权衡在安全和效率中做权衡

+ 缺点：

  算法本身安全，但使用场景不够安全，因为解密和加密都是同一个秘钥

![image-20211129183308185](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20211129183308185.png)



#### 2.2 非对称加密

+ 使用 **匹配的一对密钥** 来`分别`进行加密和解密，这两个秘钥是公开密钥（public key，简称公钥）和私有密钥（private key，简称私钥）
+ **注意：公钥加密的数据 只能 用 对应的私钥解密，同理，私钥加密的数据 只能用 对应的公钥解密**
+ 算法：RSA、ECC、Elgamal、背包算法、Rabin、D-H 等
+ 特点：安全性高
+ 缺点：加解密复杂，效率低，耗时较长
+ 用法概要：
  + 加密：对数据做加密
  + 签名：证明数据是谁发的



#### 2.3 非对称加密用法

+ **准备工作：**

  1.生成一对匹配的 私钥 和 公钥 (ps：公钥其实是根据私钥生成的)

  2.将公钥公布给外界

  ![image-20211129183423413](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20211129183423413.png)



##### 2.3.1 公钥加密

+ **场景：** 用来针对互联网上加密数据传递

  Linda 用 `James的公钥` 对数据进行加密，然后发给 James，James用自己的私钥解密

  ![image-20211129183434662](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20211129183434662.png)

  > 因为一个公钥加密的数据 只有 对应的 私钥才能解密，所以密文很安全
  >
  > 补充：如果要在网络上相互发送密文，可以让对方也发对方的公钥过来，用对方的公钥来加密



##### 2.3.2 私钥签名

+ **场景：**目的是为了将明文公布给别人，同时证明是自己发的；可以防止明文被篡改。

  **第一步：**James 用 `James的私钥` 对明文的hash值进行加密，把密文(签名)和明文一起发给 Linda

  ![image-20211129183450575](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20211129183450575.png)

  **第二步：**Linda 用 `James的公钥` 进行解密，解密后的明文hash值 和 接收到的明文的hash值进行对比，如果一样则是 James 发的

  ![image-20211129183500628](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20211129183500628.png)

### 3. https协议

+ 端口 443

![image-20211129182424353](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20211129182424353.png)

#### 3.1 问题

+ Q1：如何在网络中安全的将数据加密 传给 对方呢？
  + A1：加密
+ Q2：用什么方式加密么？
  + A2：对称加密 -> 秘钥传送安全问题
  + A2：非对称加密 -> 公钥传送安全问题
+ Q3：解决方案
  + A3：使用 权威认证机构(CA) 来证明 网站的公钥没被篡改 -- https

#### 3.2 https与http

+ 图例中体现了 http/https 与 websocket/websockets 关系

![image-20220419094833073](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220419094833073.png)

#### 3.3 https认证基本流程

+ 操作系统内置 权威证书认证机构(`CA-CertificateAuthority`)的 **机构证书X**
+ 网站A 获取认证证书
  + 生成自己的 **公钥A** 和 **私钥A**
  + 找认证机构 生成 **网站A证书**，并保存在服务器中
    + 证书(SSL)包含信息：
      + 网站的域名，证书有效期，证书颁发机构
      + 网站自己的**公钥A**等
+ 浏览器 请求获取 **网站A证书**
+ 浏览器 用 **机构证书X** 解密 **网站A证书**
  + 解密成功：获取 `网站A公钥`(只要解密成功，就说明 是 机构认证的)
  + 解密失败：认证失败
+ 浏览器 将自己的秘钥 发给服务器
  + 使用对称加密算法 生成 `会话秘钥B` 
  + 使用`网站A公钥` 对 `会话秘钥B` 做加密，并发给 服务器
+ 浏览器和服务器 使用 `浏览器会话秘钥B` 来对 请求报文 和 响应报文 做加密

![image-20211130165817603](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20211130165817603.png)

### 4. 证书认证机构

+ 如果证书颁发机构过多的话，不容易识别，防伪和管理，于是形成了少数几家国际权威的证书颁发机构，这些机构非常权威，默认是所有人都可信的，它们成为根证书。
+ 但是除了这些机构外，其他的机构也需要被信任，因而，需要这些权威的机构去授信颁发证书，于是就形成了一级证书机构，一级证书机构又可以继续授信下级机构，于是成为树状结构，对于任何一个组织到根证书就是链状结构。

### 5. CA证书的保存

+ 保存在系统中

![image-20211129162142190](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20211129162142190.png)

## 二.web优化----------

<img src="assets/image-20220409093753941.png" style="width:300px"/>

### 浏览器

#### 减少请求次数

+ 本质：合并文件
  + 合并图标：精灵图，字体图标
  + 合并 js/css/html... 可以用 webpack打包：注意，非js文件，需要额外配置不同的加载器(loader)

#### 减少文件大小

+ 详细请参考 webpack优化-减少代码提及

+ 启用 http协议允许的 压缩算法！ gzip...
+ webpack编译时，会将 js/css/html... 同类的文件尽可能编译成一个或少数几个！
  + 如果是 生产环境，则 忽略 第三方包(不需要编译到结果js文件中)，需要配置
  + 如果是 开发环境，则 不忽略 第三方包

##### http2.0

+ 特点：推荐阅读：https://zhuanlan.zhihu.com/p/26559480
  + http1 用的 字符串报文 ， http2 用的二进制数据报文
  + 多路复用：全双工，建立一次tcp连接，可以**并发**多个请求
  + 服务器端推送：不用等 浏览器来请求，服务器可以主动推送资源给浏览器
  + http2对请求报文头做压缩

#### 浏览器缓存策略

+ 推荐阅读：http://verymuch.site/2018/10/09/web-browser-cache-strategy/

![image-20220409094937855](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220409094937855.png)

```js
缓存分为强缓存和协商缓存。其中强缓存包括Expires和Cache-Control，主要是在过期策略生效时应用的缓存。弱缓存包括Last-Modified和ETag，是在协商策略后应用的缓存。强弱缓存之间的主要区别在于获取资源时是否会发送请求。
Cache-Control中的max-age指令用于指定缓存过期的相对时间，优先级高于Expires。Cache-Control指定为no-cache时，由于no-cache相当于max-age:0,must-revalidate，所以都存在时优先级也是高于Expires。
no-cache并不是指不缓存文件，no-store才是指不缓存文件。no-cache仅仅是表明跳过强缓存，强制进入协商策略。
如果Expires，Cache-Control: max-age，或 Cache-Control:s-maxage都没有在响应头中出现，并且设置了Last-Modified时，那么浏览器默认会采用一个启发式的算法，即启发式缓存。通常会取响应头的Date_value - Last-Modified_value值的10%作为缓存时间
```

+ 三种策略：存储策略、过期策略、协商策略

+ 浏览器访问资源的7种方式：

  1. (新标签)地址栏回车
  2. 链接跳转
  3. 前进、后退
  4. 从收藏栏打开链接
  5. (window.open)新开窗口
  6. 刷新（Command + R / F5）
  7. 强制刷新（Command + Shift + R / Ctrl + F5）

  ![image-20220411115344823](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220411115344823.png)

+ 细节：在Chrome下【刷新】时，只有主资源的缓存应用方式如上图所示，**派生资源的缓存应用方式与新标签打开类似，会判断缓存是否过期**。

#### 白屏时间优化

+ 推荐阅读：https://juejin.cn/post/6995455015972241444

#### QuickLink

+ 推荐阅读：https://www.jianshu.com/p/7dc94efe7e2e

##### 服务端渲染

+ 通俗：就是在服务器端 生成 html 标签

### 资源

#### 静态资源 做 cdn

+ cdn(Content Delivery  Network) 内容分发网络，一般用来 分布式存储 静态资源
+ 将来用户浏览器访问时，会自动 从距离最近的 网络节点机房中 获取 资源！

#### 静态资源 独立域名

+ `a.com` 业务网站 ，网站中的 图片 不使用这个 业务域名
+ 而是 使用 另一个域名： `static.a.com`

#### gzip压缩

+ 服务器启用 压缩算法（在配置文件中 做一个简单的配置）
+ 如果是 @vue脚手架的webpack开发服务器，可以直接 通过 vue.config.js 配置
+ 如果是 nginx 服务器，也是直接 在配置文件中配置 即可！

#### SSR 服务端渲染

+ 在服务器端 直接 根据 数据 或 组件 生成 返回 `html标签`，而不是 返回 `json数据`

#### CSS前置头部，js后置底部

+ script 标签 会阻断 浏览器线程，导致 后面的代码无法立即执行！
+ 所以，将 script 标签 后置！

#### JS文件预加载

+ 所有外部js文件 都在 页面头部 通过 link标签 去 预加载
+ 在页面底部 通过 script 标签 再次加载同名 js文件，此时 ，link标签大概率已经 将 js文件请求完毕 并 缓存在浏览器了，所以  script 标签 可以直接 从缓存中 读取js代码来执行！

![image-20220411160605753](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220411160605753.png)

### 图片

#### 字体图标替代图片图标

+ 字体图标本质上是文字，随 css 被 打包到 js中了，所以 不会 再去请求 单个图标图片了

#### 精灵图

+ 将 若干小图片 放到大图片上，减少 请求次数

#### 图片懒加载

+ 根据 当前用户的 查看 视口  来 请求图片
+ 当 用户看 第一屏的，第二屏的图片 就先不加载！
+ 等到 用户 往下拖动页面时，根据 scrollTop 来判断位置，进而 通过 js 下一屏的图片

#### 图片预加载

+ 尽管 浏览器 还没 看到 图片的位置，就通过js去预加载后面需要的图片

#### 使用png图片

+ 

#### 使用webP图片

+ 与 PNG 图片相比，**WebP 无损图片通常至少要比 PNG 图片小 25%**。 在同等的 SSIM（ 结构相似度 structural similarity ）质量指标下，WebP 有损图片通常比 JPEG 图片小 25% 到 34%。 无损 WebP 也支持透明度。 而在可接受有损 RGB 压缩的情况下，有损 WebP 也支持透明度，通常 PNG 文件大小比它大三倍。 Google 报告称，把动画 GIF 文件转换为有损 WebP 后文件大小减少了 64%，转换为无损 WebP 后文件大小减少了 19%。 WebP 文件格式是一种基于 RIFF（ 资源互换文件格式 resource interchange file format ）的文档格式。

#### 转base64图片

+ 优点：可以直接 将 图片字符串嵌入到 html 或 css 文件中！浏览器不需要单独再去请求了！
+ 缺点：会比二进制图片 大 30%，如果 存到数据库，则会给数据库读写造成部分压力
+ 方案：
  + 小于 8k的 使用 based64图片，否则 使用原图
  + 一般是 webpack 打包时，调用 图片加载器 去 打包图片时，根据大小 确定 是否生成 base64字符串
    + 小于 8k的 使用 based64图片字符串，切入到 图片 src 属性
    + 大于 8k的 则 编译到 `dist/assets/img` 文件夹中，并生成 基于hash值的 新文件名

### 代码

### 项目 优化

### webpack优化

#### keep-alive

+ 缓存被切换的组件

#### 减少代码体积

+ webpack 配置文档：https://v4.webpack.docschina.org/configuration/

+ 减少编译时的文件大小：

  + 根据 编译环境 来决定 是否 打包 体积庞大的 第三方库

  + 根据 编译环境 来决定 是否 在 index.html 模板页面中 移入 第三方库的cdn文件

+ 配置webpack 打包时

  + 如果是生产环境，则编译时 忽略 指定的 第三方 包，配置方式
  + 如果是开发环境，则不忽略 第三方包，都编译导包

+ 使用 第三方包时的问题：

  + 如果是**生产环境**，编译的js中不包含第三方包，组件中又要用到，怎么办？
    + 在 `./public/index.html` 中 去 通过标签 引入 包的cdn路径！
  + 如果是**开发环境**，编译的js中包含第三方包，在html页面中 就不需要再引入了！否则有些第三方包被重复引入时，会报错！

+ 代码演示：

  + 配置 `vue.config.js `

  ```js
  module.exports = {
      // 通过 vue 配置 webpack
      chainWebpack: config => {
          // process.env.NODE_ENV有两个值-> 'development' ,  'production'
          // 当时 生产环境 编译时，才 忽略 第三方模块包
          if (process.env.NODE_ENV === 'production') {
              // 告诉 webpack 打包时，可以 忽略 一下 模块包！
              config.externals = {
                  vue: 'Vue',
                  vuex: 'Vuex',
                  'vue-router': 'VueRouter',
                  axios: 'axios',
                  'vant': 'Vant'
              }
          }
          // 配置webpack插件HtmlWebpackPlugin，
          // 为 HtmlWebpackPlugin 的options 配置一个属性，用在 编译 index.html 模板时使用！
          // config.plugins[8].options.isProd = process.env.NODE_ENV === 'production'
          config.plugin('html').tap(args => {
              //添加参数isProd
              args[0].isProd = process.env.NODE_ENV === 'production'
              return args
          })
      },
  }
  ```

  打包优化前后对比：(只优化vant组件库的截图)

  ![image-20220409153902176](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220409153902176.png)

  + 由于 编译后的文件中 不包含 忽略的第三方模块，需要 在 `./public/index.html `中直接导入

    ![image-20220409154043081](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220409154043081.png)

  + 重复引入相同模块 **情况**：

    在 开发环境(dev)下，index.html 中引入了第三方模块包，main.js 中也引入了(webpack未排除)

  + 重复引入相同模块 **问题**：有些组件不能重复引入: Vant

    `Uncaught ReferenceError: Vant is not defined`

  + 解决方案：在 index.html 中判断当前编译环境（开发环境/生产环境），两步：

    + 在 `vue.config.js` 中为 插件 添加属性，保存 编译环境
    + 在 `index.html` 中判断后决定是否 添加第三方模块的标签引入

    ```js
    // 1. vue.config.js
    module.exports = {
        //...
        // 通过 vue 配置 webpack
        chainWebpack: config => {
            // 配置 开发工具设置项：
            // process.env.NODE_ENV === 'dev' ? 'source-map' : undefined;
            // process.env.NODE_ENV-> 'development' ,  'production'
            // 当时 生产环境 编译时
            config.when(process.env.NODE_ENV === 'production', config => {
                // 告诉 webpack 打包时，可以 忽略 一下 模块包！
                config.externals = {
                    vue: 'Vue',
                    vuex: 'Vuex',
                    'vue-router': 'VueRouter',
                    axios: 'axios',
                    'vant': 'Vant'
                }
    
                // 当时 生产环境 编译时，才 忽略 第三方模块包
                config.plugin('html').tap(args => {
                    //添加参数 isProd
                    args[0].isProd = true
                    return args
                })
            })
        },
        //...
    }
    ```

    ```html
    // ./public/index.html
    
    <head>
      <!--.......-->
      <!-- 根据判断 输出 标签 -->
      <% if(htmlWebpackPlugin.options.isProd){ %>
        <link rel="icon" href="<%= BASE_URL %>favicon.ico">
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <script src="https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js"></script>
        <script src="https://unpkg.com/vue-router@3.0.0/dist/vue-router.js"></script>
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vant@1.6/lib/index.css">
        <script src="https://cdn.jsdelivr.net/npm/vant@1.6/lib/vant.min.js"></script>
        <%}%>
      <!--.......-->
    </head>
    ```

#### <span id="lazyloader">按需加载(路由懒加载)</span>

+ 为什么要用按需加载？请思考：

  + **Vue脚手架项目特点**：SPA-**Single Page Application**
  + **好处**：只有第一次会加载页面,一次性将所有组件都请求到浏览器来了，以后的每次`组件`切换，只需要进行组件替换，不需要再请求服务器；减少了请求次数，加快页面响应速度，降低了对服务器的压力
  + **问题**：首页第一次加载时会把所有的组件以及组件相关的资源全都加载了。这样就会导致首页加载时加载了许多首页用不上的资源，造成网站首页打开速度变慢的问题，降低用户体验
  + 解决方案：路由懒加载（按需加载）--又叫组件懒加载
  + 思路：
    + 编译时，不将路由中 配置的 组件 打包到一起为一个大的js文件，而是 各自单独或分组打包，产生多个js文件
    + 浏览器端请求时，只把 第一个组件 或 第一组 组件 的js文件发给浏览器
    + 当用户 点击切换组件时，再向服务器请求 其他组件的 js文件


+ 步骤：

  + 安装插件 `yarn add @babel/plugin-syntax-dynamic-import -D`

  + 配置 `bable.config.js`

    ```js
    module.exports = {
      presets: ['@vue/cli-plugin-babel/preset'],
      'plugins': [
        //配置路由懒加载插件
        '@babel/plugin-syntax-dynamic-import'
      ]
    };
    ```

  + 配置路由 `@/router/index.js` 为组件文件 分组！

    ```js
    const routes = [
        {
            path: '/study',
            component: () => import(/* webpackChunkName:"first" */'@/views/study-more/index.vue')
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName:"first" */'@/views/login/index.vue')
        }
    ]
    ```

+ 图解：

![image-20220411110055782](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220411110055782.png)

#### webpack dll优化

## 三.SSR服务端渲染-----------

+ 专题：[【传送门】](./techs/03SSR.md)



## 四.IntersectionObserve-----

专题：[【传送门】](./techs/04IntersectionObserve.md)

## 五.同时为github和gitee配置公钥

专题：[【传送门】](./techs/06GitPushMany.md)

# 面试题 =========================

## 概念题

### 1.实现浏览器前进/后退

+ 解决方案：用数组 模拟 栈操作
+ 栈操作的特点：先进后出
+ 实现方式：
  + 从数组的头部 存取 arr.unshift  / arr.shift
  + 从数组的尾部 存取  arr.push / arr.pop

### 2.二次封装组件库

> 目的：为了 能 让配置类似的组件更大程度上的复用(数据结构类似，插槽类似等)

#### 2.1 封装组件

+ 思路

1. 项目中安装 第三方组件库(如：elementUI )
2. 自己新建 组件库文件夹 或 项目
   + 含： index.js -> 整个库的安装文件，别人使用时，可以通过 vue.use 直接注册所有组件
3. 封装 组件文件夹
   + src 文件夹：写 组件.vue 文件 和 相关代码资源
   + index.js ：用来安装 当前组件
4. 在 main.js 中安装组件库
5. 在 任意组件中使用 二次封装组件

+ 代码参考：https://gitee.com/uptocoding/jz-ui

![image-20220414105058141](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220414105058141.png)

#### 2.2 子组件中二次v-model

> 移动端项目开发时，有时会针对 vant组件 做二次封装，而其中就会出现 v-model 的二次绑定需求！

+ 需求：将 弹出层 **van-popup组件**，封装成一个自己的 **弹层组件2**
  + 父组件 将 **data.isShow** 绑定到 弹层组件2的 **props.show** 属性
  + 子组件 中 再根据 props.show 控制 **van-popup组件** 的显示和关闭
+ 问题：

![image-20220505182718378](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220505182718378.png)

+ 解决方案：子组件中 让 **van-popup组件** 对计算属性做 双向数据绑定 

![image-20220505172218151](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220505172218151.png)

### 3.webpack

#### 3.1 webpack热更新

+ 推荐阅读：https://blog.csdn.net/xiaobangsky/article/details/114600649

+ 重点：
  + webpack 的热更新又称热替换（Hot Module Replacement），缩写为 HMR。这个机制可以做到不用刷新浏览器而将新变更的模块替换掉旧的模块
  + HMR的核心就是客户端从服务端拉去更新后的文件，准确的说是 chunk diff (chunk 需要更新的部分)，实际上 WDS 与浏览器之间维护了一个 Websocket，当本地资源发生变化时，WDS 会向浏览器推送更新，并带上构建时的 hash，让客户端与上一次资源进行对比。客户端对比出差异后会向 WDS 发起 Ajax 请求来获取更改内容(文件列表、hash)，这样客户端就可以再借助这些信息继续向 WDS 发起 jsonp 请求获取该chunk的增量更新。
  + 后续的部分(拿到增量更新之后如何处理？哪些状态该保留？哪些又需要更新？)由 HotModulePlugin 来完成，提供了相关 API 以供开发者针对自身场景进行处理，像react-hot-loader 和 vue-loader 都是借助这些 API 实现 HMR。

#### 3.2 webpack\gulp\grunt

  **1)** **三者之间的区别**

​       三者都是前端构建工具，grunt和gulp在早期比较流行，现在webpack相对来说比较主流，不过一些轻量化的任务还是会用gulp来处理，比如单独打包CSS文件等。

​       grunt和gulp是基于任务和流（Task、Stream）的。类似jQuery，找到一个（或一类）文件，对其做一系列链式操作，更新流上的数据， 整条链式操作构成了一个任务，多个任务就构成了整个web的构建流程。

​       webpack是基于入口的。webpack会自动地递归解析入口所需要加载的所有资源文件，然后用不同的Loader来处理不同的文件，用Plugin来扩展webpack功能。

**2)** **从构建思路来说**

​       gulp和grunt需要开发者将整个前端构建过程拆分成多个`Task`，并合理控制所有`Task`的调用关系 webpack需要开发者找到入口，并需要清楚对于不同的资源应该使用什么Loader做何种解析和加工

 **3)** **对于知识背景来说**

​       gulp更像后端开发者的思路，需要对于整个流程了如指掌 webpack更倾向于前端开发者的思路

#### 3.3 常见的Loader

+ file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件

+ url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去

+ source-map-loader：加载额外的 Source Map 文件，以方便断点调试

+ image-loader：加载并且压缩图片文件

+ babel-loader：把 ES6 转换成 ES5

+ css-loader：加载 CSS，支持模块化、压缩、文件导入等特性

+ style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。

+ eslint-loader：通过 ESLint 检查 JavaScript 代码

#### 3.4 loader和plugin的不同

+ **不同的作用**

​       Loader直译为"加载器"。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到loader。 所以Loader的作用是让webpack拥有了加载和解析非JavaScript文件的能力。

​    Plugin直译为"插件"。Plugin可以扩展webpack的功能，让webpack具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

+ **不同的用法**

​    Loader在module.rules中配置，也就是说他作为模块的解析规则而存在。 类型为数组，每一项都是一个Object，里面描述了对于什么类型的文件（test），使用什么加载(loader)和使用的参数（options）

​    Plugin在plugins中单独配置。 类型为数组，每一项是一个plugin的实例，参数都通过构造函数传入。

### 4.对象中括号访问

```js
let a = 10; 
let obj = { a: 30 }; 
console.log(obj[a]) // 相当于 obj[10]  -> obj中没有名为10的属性，所以返回undefined
```



### 5.闭包代码题

```js
function test() {
    var n = 4399
    function add() {
        n++
        console.log(n)
    }
    return { n, add }
}

var r1 = test()
var r2 = test()

r1.add() // 4400
r2.add() // 4400
console.log(r1.n) // 4399
r2.add() // 4401
```



### 6.对象中方法里this

![image-20220307192304241](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220307192304241.png)



### 7.怎么用手机号获得验证码并且验证呀？

+ 找第三方手机验证码服务商，购买服务！
+ 在后台业务服务器，配置 服务商提供的 账户 和 统一的请求接口
  + 添加 一个 短信接口函数，负责 向服务商 发送 手机号 和 自己的账户 给 服务商，发送短信验证码
  + 服务商生成验证码后
    + **验证码** 通过 信号 发给 用户手机
    + 将 **验证码** 返回给 短信接口函数，将 验证码 保存到 数据库/内存
+ 在前台页面js中
  + 用axios 请求 短信接口，并 手机号 传过去
  + 增加用户体验：使用倒计时，提醒用户 等待 短信，60秒内不许再重复提交
  + 用户手机 接收到 短信后，将验证码 输入 到 文本框，并 点击登录按钮；
  + 发送 登录请求，将 手机号 和 验证码 发给 服务器 登录接口
+ 服务器登录接口
  + 验证 手机号 和 验证码 是否 正确：去 数据库 或 缓存中 查询！
  + 如果查到了，则登录成功；否则 登录失败

![image-20220304164902192](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220304164902192.png)

### 8.交换两个变量

```js
// 方法一：使用临时变量---------------------------------
let a = 21;  // 变量1
let b = 170; // 变量2
console.log('交换前：', a, b);

let z = a; // a=21   b=170  z=21
a = b;     // a=170  b=170  z=21
b = z;     // a=170  b=21  z=21
console.log('交换后：', a, b);


// 方法二：使用减法计算，只能针对 数字 变量做交换---------
let a = 21;  // 变量1
let b = 170; // 变量2
console.log('交换前：', a, b);

a = a + b; // 191
b = a - b; // 21
a = a - b; // 170
console.log('交换后：', a, b);
```

### 9.Math.max面试题

+ Math.max 只能依次接收 参与对比的 数字，如：`Math.max(1,69,3,9)`
+ 如果 数字 是放在数组中，需要找出最大值，怎么办？
  + 方式1：展开运算符 `...`
  + 方式2：`apply`

```js
//1.找出 多个数值中 最大数，并存入变量
let arr = [99, 88, 100, -5, 20]
//
let maxNum = Math.max(...arr);
// let maxNum = Math.max.apply(window, arr)
//2.打印最大数
console.log('最大值为：' + maxNum); // 100
```

### 10.toString

![image-20220307192522675](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220307192522675.png)

### 11.数组排序

+ 要求：按照 数组 中 字符串 的 第二个字母 顺序 排序

```js
let arr = ['wbrd', 'aa47', 'adple', 'hcawei']
// 调用数组的 sort 排序，传入 排序时的比较大小函数（比较第二个字符的ascii码数值大小）
arr.sort((x, y) => x[1].charCodeAt() - y[1].charCodeAt())

console.log(arr) // -> ['aa47', 'wbrd', 'hcawei', 'adple']
```

## 算法题

### 1.递归

+ 概念：函数自己调用自己，注意要有退出条件
+ 面试题：写一个函数 求数字阶乘

+ 代码：

```js
//5!=1*2*3*4*5
//4!=1*2*3*4
//3!=1*2*3
//2!=1*2
//1!=1
//注意：递归函数中必须要有退出条件，否则相当于死循环了
function fu(n){
    if (n === 1) {
        return 1;
    }
    return n * fu(n-1)
}
var res = fu(5)
console.log(res);
```

### 2.递归生成菜单

传送门：[【递归生成菜单】](./面试题/递归菜单.md)

# 常见问题 =========================

## 常见问题

### 1.对象null错误

![image-20220311200652596](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220311200652596.png)

### 2.子组件属性检查错误

![image-20220316105219944](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220316105219944.png)

### 3.常见脚本问题

#### 3.1找不到 脚本

![image-20220310103558395](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220310103558395.png)

+ 原因有两种：
  + 其一：没有安装 这个包！
  + 其二：系统找不到这个包的 安装路径

+ 解决方式：
  + 其一：安装这个包 `npm i -g yarn`
  + 其二：将 npm 的 全局全装路径 添加到 环境变量中！
    + 查看npm 全局安装路径： `npm config get prefix`
    + 将 路径 添加到 环境变量中！
+ 配置 yarn 的全局安装路径 到 环境变量
  + 查看 yarn 全局包的脚本路径： `yarn global bin`
  + 将 路径 添加到 环境变量

#### 3.2 禁止运行脚本

![image-20220310104544693](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220310104544693.png)

+ 操作系统默认 关闭了 脚本运行的**开关**，需要手动打开：
  + `set-executioinpolicy remotesigned`
  + 输入 `y `就可以了

![image-20220310104645353](https://md-1259458491.cos.ap-nanjing.myqcloud.com/teach/assets/image-20220310104645353.png)



