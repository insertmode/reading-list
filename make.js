var fs = require('fs');
var yaml = require('js-yaml');
var resumer = require('resumer');
var ejs = require('ejs');

// Create Rsource List from yaml docs
var yamlDocs = [];
yaml.safeLoadAll(fs.readFileSync('my_resources.yaml', 'utf8'), function(doc) {
    yamlDocs.push(doc);
});

// turn resources into a json string stream
var json = JSON.stringify({
    resources: yamlDocs
});

// bake reading list into bookmarklet code
var browserify = require('browserify');
var b = browserify();
b.add('./bookmarklet.js');
b.transform('ejsify');
b.transform('uglifyify');

// combine reading list data as json
// and bookmark code
var bookmarkTemplate = fs.readFileSync(__dirname + '/bookmarklet.ejs', 'utf8');
b.bundle(function(err, src) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    var o = {
        json: json,
        src: src
    };
    var bookmarklet = ejs.render(bookmarkTemplate, o);
    var readinglist_template = fs.readFileSync(__dirname + '/reading_list.ejs', 'utf8');
    o = {
        resources: yamlDocs,
        bookmarklet: bookmarklet
    };
    var html = ejs.render(readinglist_template, o);
    console.log(html);
});