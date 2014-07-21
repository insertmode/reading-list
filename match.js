// compare a string to a string or a regex
function isMatch(r, s) {
    console.log('matching', s, 'against',r);
    // is r a regexp?
    if (r[0] === '/' && r[r.length-1] === '/') {
        r = new RegExp(r.substr(1, r.length-2));
        var result = r.test(s);
        if (result) console.log(s, 'matches', r);
        return result;
    }
    return r == s;
}


// return the index of the reading list item that
// the student is currently looking at (the current url is passed as href)
module.exports = function(rl, href) {
    for(var i = 0; i<rl.resources.length; ++i) {
        var resource = rl.resources[i];
        // check the pages first
        if (resource.pages && resource.pages.length) {
            for(var ii=0; ii<resource.pages.length; ++ii) {
                var page = resource.pages[ii];
                if (typeof page === 'string') {
                    if (isMatch(page, href)) return {step:i, page: ii};
                } else {
                    if (isMatch(page.url, href)) return {step:i, page: ii};
                }
            }
        }
        // now check resource's entry
        if (isMatch(resource.entry, href)) return {step: i};
    }
    // found no match
    return null;
};
