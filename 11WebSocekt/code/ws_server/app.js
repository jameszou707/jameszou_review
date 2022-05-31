// 1.导入websocket node对象
var ws = require("nodejs-websocket")

// 创建 连接通道 数组
var connList = []

// 2.创建websocket服务器 ,conn -> 连接通道
var server = ws.createServer(function (conn) {
  // 2.0 将连接通道 添加到数组中保存
  connList.push(conn)
  // 2.1 连接成功，conn 与客户端的连接通道
  console.log("有客户端连接上来啦~！", connList.length)

  // 2.2 接收客户端发送的数据事件
  conn.on("text", function (str) {
    // 2.3 打印接收到的数据
    console.log("接收到数据：" + str)
    // 2.4 遍历连接数组，并发送数据
    for (var i = 0; i < connList.length; i++) {
      // 2.5 将数据发送给当前连接的客户端
      connList[i].sendText(str.toUpperCase() + "!!!")
    }
  })

  // 2.3 关闭连接事件：连接通道被关闭时触发
  conn.on("close", function (code, reason) {
    console.log("当前连接被关闭！原因->", reason)
    // 2.4 将当前连接通道从数组中移除
    connList.splice(connList.indexOf(conn), 1)
    console.log("当前连接数量：", connList.length)
  })

  // 2.4 异常事件：连接通道出现异常时触发
  conn.on("error", function (code, reason) {
    console.log("异常事件：", reason)
  })

}).listen(9898, function () {
  console.log('websocket server is listening on port 9898')
})
