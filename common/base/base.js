window.dq = sel => document.querySelector(sel);
window.dqa = sel => document.querySelectorAll(sel);
if(typeof struts == "undefined") { //导入的是 源码
  window.LinkQueue = LinkQueue;
  window.LinkStack = LinkStack;
} else { // 导入的是压缩版
  window.LinkQueue = struts.LinkQueue;
  window.LinkStack = struts.LinkStack;
}
window.events = {}; // { "元素": { "事件名1": [handler1, handler2], "事件名2": [handler3, handler4] } }

window.reomveRegistedEvent = function(elem, eventName, index, fn) {
  if(typeof index != "number") {
    console.error("必须传入索引！");
    return;
  }
  fn = fn || false;
  let evtObj = window.events[elem];

  if(!evtObj) {
    console.error("元素 " + elem +" 未注册事件！");
    return;
  }
  let handlers = evtObj[eventName];
  let handler = handlers[index];
  if(!handlers) {
    console.error("元素 " + elem +" 未注册 " + eventName +" 事件！");
    return;
  }

  elem.removeEventListener(eventName, handler, fn);
  evtObj[eventName] = evtObj[eventName].filter(fun => fun != handler);
}

window.addClass = function(jsDom, className) {
  let oriClassName = jsDom.getAttribute("class");
  if(oriClassName) {
    let classNames = oriClassName.split(" ");
    classNames.push(className);
    jsDom.setAttribute("class", classNames.join(" "));
  } else {
    jsDom.setAttribute("class", className);
  }
}
window.removeClass = function(jsDom, className) {
  let jsDomClassNames = jsDom.className;
  if(!jsDomClassNames) {
    console.error("传入的DOM对象未设置class属性！");
    return;
  }
  console.log(jsDomClassNames);
  let classArr = jsDomClassNames.split(" ");
  classArr = classArr.filter(e => e != className); //过滤掉不需要的className
  console.log(classArr);
  jsDom.setAttribute("class", classArr.join(" "));
}
console.warn("==★此处应该判断所需的前置插件是否已经安装★==");

const addEventListener = function(jsDom, eventName, handler, fn) { //使用该方法为 元素添加监听 后续可以获取到元素
  // console.log(jsDom);
  //从window.events中获取该元素注册的事件
  if(window.events[jsDom]) {
    let handlers = window.events[jsDom][eventName];
    if(handlers && handlers.constructor === Array) {
      handlers.push(handler);
    } else {
      window.events[jsDom][eventName] = [];
      window.events[jsDom][eventName].push(handler);
    }

  } else {
    window.events[jsDom] = {};
    window.events[jsDom][eventName] = [];
    window.events[jsDom][eventName].push(handler);
  }
  jsDom.addEventListener(eventName, handler, fn);
}

const createElement = function(propObj) {
  let { tagName, defAttr={}, custAttr={}, sonNodes=[], handlers={} } = propObj;
  if(typeof tagName != "string") {
    console.error("请正确输入tagName");
    return;
  }
  let element = document.createElement(tagName);
  // 处理属性 文字
  for(let defAttrName in defAttr) {
    if(defAttrName === "class" && typeof defAttr[defAttrName] === "string") { // 传入类名的是: "classa classb"
      element.setAttribute("class", defAttr[defAttrName]);
    }
    else if(defAttrName === "class" && typeof defAttr[defAttrName].constructor === Array) { // 传入的是 ["classa", "classb"]
      element.setAttribute("class", defAttr.join(" "));
    }
    else if(defAttrName === "style") {
      for(let cssName in defAttr[defAttrName]) {
        let arr = cssName.split("-");
        arr[1] = arr[1][0].toUpperCase() + arr[1].substring(1);
        let newCssName = arr.join("");
        element.style[newCssName] = defAttr[defAttrName][cssName];
      }
    }
    else {
      element[defAttrName] = defAttr[defAttrName];
    }
  }
  // 处理自定义属性
  for(let custAttrName in custAttr) {
    element.setAttribute(custAttrName, custAttr[custAttrName]);
  }
  //创建子节点
  for(let index in sonNodes) {
    let node = sonNodes[index];
    console.log(node);
    element.append(createElement(node));
  }
  //事件处理
  for(let eventName in handlers) {
    let handler = handlers[eventName];
    if(typeof handler != "function") {
      console.error("元素: " + element + "未注册事件: " + eventName + "！原因: " + eventName + " 事件对应的handler不是一个函数！");
      continue;
    }
    addEventListener(element, eventName, handler, false);
  }

  return element;
}

document.ready = function(callback) {
  if(document.addEventListener) {
    document.addEventListener("DOMContentLoaded", () => {
      document.removeEventListener("DOMContentLoaded", arguments.callee);
      callback();
    }, false);
  } else if(document.attachEvent) {
    document.attachEvent("onreadystatechange", () => {
      if(document.readyState === "complete") {
        document.detachEvent("onreadystatechange", arguments.callee)
        callback();
      }
    });
  } else if(document.lastChild === document.body){
    callback();
  }
}

// window.modal = { "big": [ { "id": "i333"}, {} ], "small" };
window.modal = { "big": [], "small": [] };
function initModal(size) {
  if(size === "big") {
    let id = "bootstrap_modal" + parseInt(Math.random()*10000)
    let bigModal = createElement("div", {
      defAttr: {
        "class": ["modal", "fade"],
        "id": id,
        "tabindex": -1,
        "role": "dialog"
      },
      custAttr: {}
    });
  } else if(size === "small"){

  }
}
