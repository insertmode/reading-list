// we expect READING_LIST_DATA to be defined
var render = require('./render');
var match = require('./match');

var ctx = READING_LIST_DATA;
ctx.link_target = '_parent';
var html = render(ctx);
console.log(html);

var container = document.createElement('iframe');
container.setAttribute('style', "top:0px;left:0px;z-index:30000;position:fixed;width:300px;height:100%;background-color:white;border-right: 2px solid 444;");
document.body.appendChild(container);
container.contentDocument.body.innerHTML = html;
document.body.style.marginLeft = '300px';

var index = match(ctx, document.location.href);
console.log('matching rl entry', index);

