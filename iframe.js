var render = require('./render');
var rl = {
    resources: require('./my_resources.yaml')
};
var html = render(rl);
var container = document.createElement('div');
container.innerHTML = html;
document.body.appendChild(container);
