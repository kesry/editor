class Node {
    constructor(data, next) {
        this.data = data;
        this.next = next;
    }

    setNext(next) {
        this.next = next;
    }

    getNext() {
        return this.next;
    }

    getData() {
        return this.data;
    }

    setData(data) {
        this.data = data;
    }
}
class LinkQueue {
    constructor(checkFun) {
        if(typeof checkFun != "function") {
            throw new Error("必须传入一个checkFun函数，而且它必须有布尔类型的返回值！");
            return;
        }
        this.checkFun = checkFun;
        this.head = new Node(null, null);
        this.tail = this.head; //尾指针
        this.size = 0; //队列长度
    }

    //进队列，尾插法
    inQueue(data) {
        if(!this.checkFun(data)) {
            throw new Error("第 " + (this.size + 1) + " 个入队列元素未通过自定义检测函数: " + this.checkFun + ". 入队列元素:" + data + ". 元素类型：" + typeof data);
            return;
        }

        let funNode = new Node(data, null);
        this.tail.next = funNode;
        this.tail = funNode;
        this.size = this.size + 1;
    }

    //获取参数检测函数
    getCheckFun() { return this.checkFun; }
    //设置参数检测函数
    setCheckFun(checkFun) {
        if(typeof checkFun != 'function') {
            throw new Error("必须传入一个checkFun函数，而且它必须有布尔类型的返回值！");
        }
        this.checkFun = checkFun;
        return this.size;
    }

    //批量进队列
    inQueueFromArr(arr) {
        arr  = arr || [];
        let i = -1;
        while((i = i + 1) < arr.length) {
            try {
                this.inQueue(arr[i]);
            } catch(e) {
                console.error("第", (i + 1) , "个入队列元素未通过自定义检测函数: ", this.checkFun, "入队列元素:", arr[i], "元素类型：", typeof arr[i]);
            }
        }
    }

    //出队列
    outQueue() {
        if(this.isEmpty()) {
            throw new Error("队列已空！");
            return;
        }
        let node = this.head.next;
        this.head.next = node.next;
        this.size = this.size - 1;
        return node.data;
    }

    //判空
    isEmpty() {
        return this.size == 0;
    }
    //是否有下一个元素
    haseNext() {
        return this.size > 0;
    }
    //下一个元素
    next() {
        if(!this.haseNext()) {
            throw new Error("队列已空！");
        } else {
            return this.outQueue();
        }
    }
    //置空
    empty() {
        this.size = 0;
        this.head.next = null;
        this.tail = this.head;
    }

    getSize() { return this.size; }
}
class LinkStack{
    constructor(checkFun) {
        if(typeof checkFun != "function") {
            throw new Error("必须传入一个checkFun函数，而且它必须有布尔类型的返回值！");
            return;
        }
        this.checkFun = checkFun;
        this.head = new Node(null, null);
        this.size = 0; //队列长度
    }

    //获取参数检测函数
    getCheckFun() { return this.checkFun; }
    //设置参数检测函数
    setCheckFun(checkFun) {
        if(typeof checkFun != 'function') {
            throw new Error("必须传入一个checkFun函数，而且它必须有布尔类型的返回值！");
        }
        this.checkFun = checkFun;
        return this.size;
    }
    //压栈
    inStack(data) {
        this.head.next = new Node(data, this.head.next);
        this.size = this.size + 1;
    }
    //出栈
    outStack() {
        let tempNode = this.head.next;
        this.head.next = tempNode.next;
        tempNode.next = null;
        this.size = this.size - 1;
        return tempNode.data;
    }
    //判空
    isEmpty() { return this.size == 0; }
    //仅取出栈顶元素，不删除元素
    top() {
        if(!this.isEmpty()) {
            return this.head.next.data;
        } else {
            console.error("stack is empty!");
        }
    }

    //批量压栈
    inStackFromArr(arr) {
        arr  = arr || [];
        let i = -1;
        while((i = i + 1) < arr.length) {
            try {
                this.inStack(arr[i]);
            } catch(e) {
                console.error("第", (i + 1) , "个入队列元素未通过自定义检测函数: ", this.checkFun, "入队列元素:", arr[i], "元素类型：", typeof arr[i]);
            }
        }
    }

    getSize() { return this.size; }

    empty() {
        this.size = 0;
        this.head.next = null;
    }

    haseNext() { return this.size != 0; }

    //下一个元素
    next() {
        if(this.isEmpty()) {
            throw new Error("队列已空！");
        } else {
            return this.outStack();
        }
    }

}
