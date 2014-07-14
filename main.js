var browserify = require('browserify');
var envify = require('envify/custom');
var b = browserify();

b.add('./bookmarklet.js');
/*b.transform(envify({
      READINGLISTJSON: 'my_readinglist.json'
}));*/

//b.transform('brfs');
b.require('./my_readinglist.json', {expose: 'reading_list'})
b.bundle().pipe(process.stdout);
