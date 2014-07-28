// we expect READING_LIST_DATA to be defined
var render = require('./render');
var match = require('./match');
var styles = require('./bookmarklet.styl');
var hostStyles = require('./host.styl');
var insertCSS = require('insert-css');
var constants = require('./constants');
//console.log(constants);

var duration = parseFloat(constants.duration) * 1000;
console.log(duration);

var ctx = READING_LIST_DATA;
ctx.link_target = '_parent';
var html = render(ctx);

var container = document.createElement('iframe');
container.setAttribute("id", "_SHECODES_sidebar_container");
document.body.appendChild(container);

var doc = container.contentDocument;
doc.body.innerHTML = html;
var filter = doc.createElement('div');
filter.classList.add('filter');
doc.body.appendChild(filter);
filter.classList.add('foldout');
// remove filter div after animation is done
setTimeout(function() {
    doc.body.removeChild(filter);
}, duration);
insertCSS(hostStyles);
insertCSS(styles, {document: doc});

var m  = match(ctx, document.location.href);
console.log('matching rl entry', m);
if (m !== null) {
    var step = doc.getElementsByTagName('ol')[0].children[m.step];
    step.setAttribute('class','current');
    if (typeof m.page !== 'undefined') {
        var page = step.getElementsByClassName('page')[m.page];
        page.setAttribute('class', 'page current');
        var pageControl = step.getElementsByClassName('pageControl')[0];
        var dot = pageControl.getElementsByTagName('li')[m.page];
        dot.className += ' current';

    }
}
document.body.classList.add('_SHECODES_pushed');

