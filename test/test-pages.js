var expect  = require('chai').expect;
var request = require('request');

it('1)Reading file in local directory outside working directory', function(done) {
    request('http://localhost:3001' , function(error, response, body) {
        expect(body).to.equal('Hello content!Hello content2!');
        done();
    });
});

it('2)1)takes two parameters in a GET call and produces their product.', function(done) {
    request('http://localhost:3001/users/1/2' , function(error, response, body) {
        expect(body).to.equal('{"FirstUser":{"name":"mahesh","password":"password1","profession":"teacher","id":1},"SecondUser":{"name":"suresh","password":"password2","profession":"librarian","id":2}}');
        done();
    });
});
it('2)2)takes two parameters in a GET call and produces their product.', function(done) {
    request('http://localhost:3001/users/3/2' , function(error, response, body) {
        expect(body).to.equal('{"FirstUser":{"name":"ramesh","password":"password3","profession":"clerk","id":3},"SecondUser":{"name":"suresh","password":"password2","profession":"librarian","id":2}}');
        done();
    });
});

it('4)1)accepts a String as an input name and returns the first non-repeating character in the String', function(done) {
    request('http://localhost:3001/string/stress' , function(error, response, body) {
        expect(body).to.equal('t');
        done();
    });
});

it('4)2)accepts a String as an input name and returns the first non-repeating character in the String', function(done) {
    request('http://localhost:3001/string/wire' , function(error, response, body) {
        expect(body).to.equal('w');
        done();
    });
});

it('4)3)accepts a String as an input name and returns the first non-repeating character in the String', function(done) {
    request('http://localhost:3001/string/reverse' , function(error, response, body) {
        expect(body).to.equal('v');
        done();
    });
});

it('4)3)accepts a String as an input name and returns the first non-repeating character in the String', function(done) {
    request('http://localhost:3001/string/1243543' , function(error, response, body) {
        expect(body).to.equal('1');
        done();
    });
});