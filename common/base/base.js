window.dq = sel => document.querySelector(sel);

window.dqa = sel => document.querySelectorAll(sel);

window.evts = {}; // { "元素": { "事件名1": [handler1, handler2], "事件名2": [handler3, handler4] } }

document.ready = function(callback) {
  if(document.addEventListener){ //FF 和 Chrome
    document.addEventListener("DOMContentLoaded", function() {
      //触发完 ready 后将事件清空
      document.removeEventListener("DOMContentLoaded", arguments.callee, false);
      callback();
    }, false)
  } else if(document.attachEvent) {
    document.attachEvent("onreadystatechange", function() {
      if(document.readyState === "complete") {
        document.detachEvent("onreadystatechange", arguments.callee);
        callback();
      }
    })
  } else if(document.lastchild === document.body){
    callback();
  }
}

window.addEventListener = function(evnObj) { //
  let { elem, evtName, handler, fn } = evnObj;
  let evtArr;
  if(window.evts[elem] && window.evts[elem][evtName]) {
    evtArr = window.evts[elem][evtName]; //该元素注册的响应的事件应该都在这里面
  } else {
    evtArr = [];
    window.evts[elem] = {};
    window.evts[elem][evtName] = evtArr;
  }
  evtArr.push(handler);
  elem.addEventListener(evtName, handler, fn);
}
