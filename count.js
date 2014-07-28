// arguments reading list and index of step
// returns array of booleans. One entry for each page,
//  true if page has notes, false otherwise
module.exports = function(rl, index) {
    var resource = rl.resources[index];
    var hasNotes = []; // array of boolean, true if page has a note
    if (resource.pages && resource.pages.length) {
        for(var ii=0; ii<resource.pages.length; ++ii) {
            var page = resource.pages[ii];
            if (typeof page !== 'string') {
                if (typeof page.description === 'string') {
                   hasNotes.push(true);  
                   continue;
                }
            }
            hasNotes.push(false);  
        }
    }
    return hasNotes;
};
