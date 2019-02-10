var expect  = require('chai').expect;
var request = require('request');

it('1)Reading file in local directory outside working directory', function(done) {
    request('http://localhost:3001' , function(error, response, body) {
        expect(body).to.equal('Hello content!Hello content2!');
        done();
    });
});


