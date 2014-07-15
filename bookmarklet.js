// we expect READING_LIST_DATA to be defined
var render = require('./render');
var match = require('./match');
var styles = require('./bookmarklet.styl');
var insertCSS = require('insert-css');

var ctx = READING_LIST_DATA;
ctx.link_target = '_parent';
var html = render(ctx);
console.log(html);

var container = document.createElement('iframe');
container.setAttribute('style', "top:0px;left:0px;z-index:30000;position:fixed;width:300px;height:100%;background-color:white;border: none;");
document.body.appendChild(container);
document.body.style.marginLeft = '300px';
var doc = container.contentDocument;
doc.body.innerHTML = html;

insertCSS(styles, {document: doc});

var index = match(ctx, document.location.href);
console.log('matching rl entry', index);
if (index !== -1) {
    doc.getElementsByTagName('ul')[0].children[index].setAttribute('class','current');
}
