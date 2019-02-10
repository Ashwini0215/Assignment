var expect  = require('chai').expect;
var request = require('request');

describe('takes two parameters in a GET call and produces their product.', function () {
    it('Input Value 1,2', function(done) {
        request('http://localhost:3001/users/1/2' , function(error, response, body) {
            expect(body).to.equal('{"FirstUser":{"name":"mahesh","password":"password1","profession":"teacher","id":1},"SecondUser":{"name":"suresh","password":"password2","profession":"librarian","id":2}}');
            done();
        });
    });
    it('Input Value 3,2', function(done) {
        request('http://localhost:3001/users/3/2' , function(error, response, body) {
            expect(body).to.equal('{"FirstUser":{"name":"ramesh","password":"password3","profession":"clerk","id":3},"SecondUser":{"name":"suresh","password":"password2","profession":"librarian","id":2}}');
            done();
        });
    });
    it('Input Value 1/9', function(done) {
        request('http://localhost:3001/users/1/9' , function(error, response, body) {
            expect(body).to.equal('{"FirstUser":{"name":"mahesh","password":"password1","profession":"teacher","id":1}}');
            done();
        });
    });
})

