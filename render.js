var count = require('./count');
var template = require('./reading_list.ejs');
module.exports = function(rl) {
    // adding nodeCount and notes property to each
    // resource
    for(var i=0; i<rl.resources.length; ++i) {
        var hasNotes = count(rl, i);
        var noteCount = 0;
        hasNotes.forEach(function(b) {if(b) noteCount++;});
        rl.resources[i].noteCount = noteCount;
        rl.resources[i].notes = hasNotes;
    }
    return template(rl);
};
