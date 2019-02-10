var expect  = require('chai').expect;
var request = require('request');
describe('3 Accepts a file content(image) and stores to disk ', function () {
    it('Input value: fileupload', function(done) {
        request('http://localhost:3001/fileupload' , function(error, response, body) {
            //expect(body).to.equal('t');
            done();
        });
    });


})
