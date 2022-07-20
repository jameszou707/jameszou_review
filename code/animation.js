
// 匀速运动函数 
// 问题：当 多次 调用 move 函数，会 启动 多个 计时器 移动 相同元素对象，导致 元素 移动速度 变快
function move(eleObj, targetPos) {

    // 0.1先 尝试 将 dom对象上的 timerId取出，如果 不为空，则 停止改id对应的计时器
    if (eleObj.timerId != undefined) {
        clearInterval(eleObj.timerId);
    }

    // 0.2确定方向 true - 右移 ， false - 左移
    let isToRight = eleObj.offsetLeft < targetPos;

    // 0.3再启动一个新的 计时器，并将 计时器id　存入dom对象的timerId属性
    eleObj.timerId = setInterval(function () {
        //1.获取 当前元素 的位置
        let curPos = eleObj.offsetLeft;
        //2.设置并 移动 步长 （要根据【方向】确定 正负）
        let step = isToRight ? 17 : -17;
        eleObj.style.left = curPos + step + 'px';

        //3.边界检查：检查 是否 到达 目标位置（要根据【方向】确定判断目标位置的方式 >= / <= ）
        if (isToRight ? (eleObj.offsetLeft >= targetPos) : (eleObj.offsetLeft <= targetPos)) {
            //3.1 元素复位
            eleObj.style.left = targetPos + 'px';
            //3.2 停止计时器
            clearInterval(eleObj.timerId);
        }
    }, 15);
}

// 缓动运动函数
function moveSlow(eleObj, targetPos) {
    // 思路：每次 的 步长 不一样： 目标位置 - 当前位置 / 10

    // 0.1先 尝试 将 dom对象上的 timerId取出，如果 不为空，则 停止改id对应的计时器
    if (eleObj.timerId != undefined) {
        clearInterval(eleObj.timerId);
    }

    // 0.3再启动一个新的 计时器，并将 计时器id　存入dom对象的timerId属性
    eleObj.timerId = setInterval(function () {
        //1.获取 当前元素 的位置 ，offsetLeft 获取的 位置数值 不包含小数
        let curPos = eleObj.offsetLeft; // 783
        //2.设置并 移动 缓动步长 : (目标位置 - 当前位置) / 10
        //  注意：
        //      如果 是向右移动，则使用 Math.ceil()  向上取整 ，最后几步 步长为 1px
        //      如果 是向左移动，则使用 Math.floor() 向下取整 ，最后几步 步长为 -1px

        let step = (targetPos - curPos) / 15;
        // 根据方向 使用不同方法 取整           1                   -1
        step = curPos < targetPos ? Math.ceil(step) : Math.floor(step);
        eleObj.style.left = curPos + step + 'px'; //

        //3.边界检查：检查 是否 到达 目标位置
        if (eleObj.offsetLeft == targetPos) {
            //3.1 停止计时器
            clearInterval(eleObj.timerId);
        }
    }, 20);
}
