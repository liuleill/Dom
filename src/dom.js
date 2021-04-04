window.dom = {
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim(); //trim去掉字符串两边的空格
    return container.content.firstChild;
  },

  after(node, node2) {
    //node2放在node后面
    node.parentNode.insertBefore(node2, node.nextSibling);
  },

  before(
    node,
    node2 //node放在node2前面
  ) {
    node.parentNode.insertBefore(node2, node);
  },

  append(parent, node) {
    parent.appendChild(node);
  },

  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
  },

  empty(node) {
    node.parentNode.removeChild(node);
    return node;
  },

  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },

  empty(node) {
    //const childNodes = node.childNodes可以简写成下面的代码
    const { childNodes } = node;
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },

  //改
  attr(node, name, value) {
    //重载
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },

  text(node, string) {
    //这种写代码的方式叫做：适配
    if (arguments.length === 2) {
      if ("innerHTML" in node) {
        //true
        node.innerHTML = string; //IE浏览器用
      } else {
        //不是IE的用
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ("innerHTML" in node) {
        //true
        return node.innerHTML; //IE浏览器用
      } else {
        //不是IE的用
        return node.textContent;
      }
    }
  },

  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },

  style(node, object, value) {
    //修改样式
    let name = object;
    if (arguments.length === 3) {
      //dom.style(div,'color','red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        //dom.style(div,'color')
        return node.style[name];
      } else if (name instanceof Object) {
        //dom.style(div,{color:'red'})
        for (let key in name) {
          node.style[key] = name[key];
        }
      }
    }
  },

  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },

  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },

  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },

  find(selector, scope) {
    //限定一个范围
    //debugger;
    return (scope || document).querySelectorAll(selector);
  },

  parent(node) {
    return node.parentNode;
  },

  children(node) {
    return node.children;
  },

  siblings(node) {
    //只要当前元素不等于该节点，即只要兄弟节点
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },

  next(node) {
    let x = node.nextSibling;
    while (x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },

  previous(node) {
    let x = node.previousSibling;
    while (x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },

  //遍历
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },

  //获取排名，子元素的第几位
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
