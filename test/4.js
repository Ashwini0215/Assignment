var expect  = require('chai').expect;
var request = require('request');

describe('Accepts a String as an input name and returns the first non-repeating character in the String', function () {
    it('Input value: stress', function(done) {
        request('http://localhost:3001/string/stress' , function(error, response, body) {
            expect(body).to.equal('t');
            done();
        });
    });

    it('Input value: wire', function(done) {
        request('http://localhost:3001/string/wire' , function(error, response, body) {
            expect(body).to.equal('w');
            done();
        });
    });

    it('Input value: reverse', function(done) {
        request('http://localhost:3001/string/reverse' , function(error, response, body) {
            expect(body).to.equal('v');
            done();
        });
    });

    it('Input value:1243543', function(done) {
        request('http://localhost:3001/string/1243543' , function(error, response, body) {
            expect(body).to.equal('1');
            done();
        });
    });
})
