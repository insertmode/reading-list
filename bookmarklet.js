// we expect READING_LIST_DATA to be defined
var render = require('./render');
var html = render(READING_LIST_DATA);
var container = document.createElement('div');
container.innerHTML = html;
container.setAttribute('style', "top:0px;left:0px;z-index:30000;position:fixed;width:300px;background-color:white;border-right: 2px solid 444;");
document.body.appendChild(container);
document.body.style.marginLeft = '300px';
