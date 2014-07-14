//var fs = require('fs');
//var json = require('./'+process.env.READINGLISTJSON);
//var json = fs.readFileSync(process.env.READINGLISTJSON, 'utf8');
//var rl = JSON.parse(json);
var rl = require('reading_list');
var render = require('./render');
console.log(render(rl));
