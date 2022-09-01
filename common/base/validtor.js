class Vlidator {
  constructor(formObj, rules) { //传入的form对象
    if(formObj.constructor === FormData) {
      this.formObj = formObj;
    }
    else {
      console.error("validtor需要传入一个FormData对象！");
      return;
    }
  }
  valid(names) {
    if(names.constructor === Array) { //验证多个字段，全为

    } else if(names.constructor === String) {
      
    } else {
      return false;
    }
  }
}
