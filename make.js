#!/usr/bin/env node

var concat = require('concat-stream');
var fs = require('fs');
var yaml = require('js-yaml');
var resumer = require('resumer');
var ejs = require('ejs');
var inspect = require('util').inspect;

function compileReadingList(yamlInput, cb) {
    // Create Rsource List from yaml docs
    var yamlDocs = [];
    yaml.safeLoadAll(yamlInput, function(doc) {
        yamlDocs.push(doc);
    });
    //console.error(inspect(yamlDocs, {depth: null}));

    // turn resources into a json string stream
    var json = JSON.stringify({
        resources: yamlDocs
    });

    // bake reading list into bookmarklet code
    var browserify = require('browserify');
    var b = browserify();
    b.add(__dirname + '/bookmarklet.js');
    b.transform('ejsify');
    b.transform('stylify');
    b.transform('uglifyify');

    // combine reading list data as json
    // and bookmark code
    var bookmarkTemplate = fs.readFileSync(__dirname + '/bookmarklet.ejs', 'utf8');
    b.bundle(function(err, src) {
        if (err) {
            return cb(err);
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
        return cb(null, html);
    });
}

if (module === require.main) {
    var sink =  concat(function(input) {
        compileReadingList(input, function(err, html) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            console.log(html);
        });
    });
    process.stdin.pipe(sink);
} else {
    module.exports = compileReadingList;
}
