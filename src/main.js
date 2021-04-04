const div = dom.create(`<div>divAfter</div>`);
dom.after(test, div);

const divBefore = dom.create(`<div>divBefore</div>`);
dom.before(test, divBefore);

const div3 = dom.create('<div id="parent">this</div>');
dom.wrap(test, div3);

const nodes = dom.empty(window.empty);
console.log("hello");
console.log(nodes);

//把test的title改成hi,i am leilei
dom.attr(test, "title", "hi,I am liulei");
const title = dom.attr(test, "title");
console.log(`title:${title}`);

dom.text(test, "改变");

dom.html(test, "你好，这是我刚改的内容");

dom.style(test, { border: "1px solid red", color: "blue" });
console.log(dom.style(test, "border"));
console.log("helloworld");
dom.style(test, "border", "1px solid red");

const fn = () => {
  console.log("点击了");
};
dom.on(test, "click", fn);
dom.off(test, "click", fn);

const testDiv = dom.find("#test")[0];
console.log(testDiv);
console.log(dom.find(".red", testDiv));

console.log("dom.parent(test):" + dom.parent(test));

console.log(dom.siblings(dom.find("#s2")[0]));

console.log(dom.next(dom.find("#s2")[0]));

const s2 = dom.find("#s2")[0];
console.log(dom.siblings(s2));
console.log(dom.next(s2));
console.log(dom.previous(s2));

const t = dom.find("#travel")[0];
dom.each(dom.children(t), (n) => dom.style(n, "color", "purple"));

console.log(dom.index(s3));
