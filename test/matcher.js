var Lab = require('lab');
var match = require('../match');

Lab.test('matching against entry points', function(done) {

    var rl = {
        resources: [
            {
                entry: 'http://a'
            },{
                entry: 'http://b'
            }
        ]           
    };

    Lab.expect(match(rl, 'http://a').step).equals(0);
    Lab.expect(match(rl, 'http://b').step).equals(1);
    Lab.expect(match(rl, 'http://c')).equals(null);
    
    done();
});

Lab.test('matching against pages (strings)', function(done) {

    var rl = {
        resources: [
            {
                entry: 'http://a',
                pages: ['1','2']
            },{
                entry: 'http://b',
                pages: ['333','4'],
            }
        ]           
    };

    Lab.expect(match(rl, 'http://a').step).equals(0);
    Lab.expect(match(rl, 'http://b').step).equals(1);
    
    Lab.expect(match(rl, '1').step).equals(0);
    Lab.expect(match(rl, '1').page).equals(0);
    Lab.expect(match(rl, '2').step).equals(0);
    Lab.expect(match(rl, '2').page).equals(1);
    
    Lab.expect(match(rl, '333').step).equals(1);
    Lab.expect(match(rl, '333').page).equals(0);
    Lab.expect(match(rl, '4').step).equals(1);
    Lab.expect(match(rl, '4').page).equals(1);
    
    Lab.expect(match(rl, '5')).equals(null);

    done();
});


Lab.test('matching against pages (regex)', function(done) {

    var rl = {
        resources: [
            {
                entry: 'http://a',
                pages: ['/1/','/2/']
            },{
                pages: ['/3{3}|4/',],
                entry: 'http://b'
            }
        ]           
    };

    Lab.expect(match(rl, 'http://a').step).equals(0);
    Lab.expect(match(rl, 'http://b').step).equals(1);
    
    Lab.expect(match(rl, '1').step).equals(0);
    Lab.expect(match(rl, '2').step).equals(0);
    
    Lab.expect(match(rl, '4').step).equals(1);
    Lab.expect(match(rl, '333').step).equals(1);
    
    Lab.expect(match(rl, '5')).equals(null);

    done();
});

Lab.test('matching against pages (url property)', function(done) {

    var rl = {
        resources: [
            {
                entry: 'http://a',
                pages: [{url:'/1/'}, {url:'2'}]
            },{
                pages: [{url:'/3{3}|4/'}],
                entry: 'http://b'
            }
        ]           
    };

    Lab.expect(match(rl, 'http://a').step).equals(0);
    Lab.expect(match(rl, 'http://b').step).equals(1);
    
    Lab.expect(match(rl, '1').step).equals(0);
    Lab.expect(match(rl, '1').page).equals(0);
    Lab.expect(match(rl, '2').step).equals(0);
    Lab.expect(match(rl, '2').page).equals(1);
    
    Lab.expect(match(rl, '4').step).equals(1);
    Lab.expect(match(rl, '333').step).equals(1);
    
    Lab.expect(match(rl, '5')).equals(null);

    done();
});


