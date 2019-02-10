var express = require('express');
var app = express();
var fs = require("fs");
var url = require('url');
var bodyParser = require('body-parser');
var multer  = require('multer');
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

//1)Reading file in local directory outside working directory
app.get('/', function (req, res) {
    fs.readFile( 'D:/AshwiniNode/FileSystem' + "/" + "mynewfile1.txt", 'utf8', function (err, data) {
        console.log(data);
        res.end( data );
    });
})

//1)Reading file in local directory inside working directory
app.get('/demo', function (req, res) {
    fs.readFile( __dirname + "/" + "demofile1.html", 'utf8', function (err, data) {
        res.end( data );
    });
})

app.get('/listUsers', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
    });
})
//takes two parameters in a GET call and produces their product.
app.get('/users/:id1/:id2', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        var users = JSON.parse( data );
        var user = {
                "FirstUser": users["user" + req.params.id1],
                "SecondUser": users["user" + req.params.id2]
        };
        console.log( user );
        res.end( JSON.stringify(user));
    });
})

//3 Accepts a file content(image) and stores to disk (multer module is used)
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //for testing saving in the same directory
        cb(null, 'uploads/')
        // cb(null, '/tmp/my-uploads')

    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage })

app.get('/fileupload',function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post('/uploadImage', upload.single('image'), function (req, res, next) {
    console.log("success");
    res.write("Succesfully uploaded");
    res.status(204).end();
});

//4 accepts a String as an input name and returns the first non-repeating character in the String.
app.get('/string/:string', function (req, res) {
    var string = req.params.string;
    var stringOutput = firstNonRepeatingCharacter(string);
    function firstNonRepeatingCharacter(string) {
        for (var i = 0; i < string.length; i++) {
            var c = string.charAt(i);
            if (string.indexOf(c) == i && string.indexOf(c, i + 1) == -1) {
                return c;
            }
        }
        return null;
    }
    res.end(stringOutput);

})


/*5)
Web crawler using cheerio node module*
input: http://localhost:3001/url/http://www.arstechnica.com
ouput: text with visited sites
 */

app.get('/url/*/', function (req, res) {
//var START_URL = "http://www.arstechnica.com";
    var START_URL = req.params[0];
    console.log("#START_URL",START_URL);

    var SEARCH_WORD = "stemming";
    var MAX_PAGES_TO_VISIT = 10;

    var pagesVisited = {};
    var numPagesVisited = 0;
    var pagesToVisit = [];
    var url = new URL(START_URL);
    var baseUrl = url.protocol + "//" + url.hostname;

    pagesToVisit.push(START_URL);
    crawl();

    function crawl() {
        if(numPagesVisited >= MAX_PAGES_TO_VISIT) {
            console.log("Reached max limit of number of pages to visit.");
            return;
        }
        var nextPage = pagesToVisit.pop();
        if (nextPage in pagesVisited) {
            // We've already visited this page, so repeat the crawl
            crawl();
        } else {
            // New page we haven't visited
            visitPage(nextPage, crawl);
        }
    }
    function visitPage(url, callback) {
        // Add page to our set
        pagesVisited[url] = true;
        numPagesVisited++;

        // Make the request
        console.log("Visiting page " +url);
        console.log("#pagesVisited",pagesVisited );
        var stringify=JSON.stringify(pagesVisited)
        fs.appendFile('pagesFile.txt',stringify , function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
        request(url, function(error, response, body) {
            // Check status code (200 is HTTP OK)
            console.log("Status code: " + response.statusCode);
            if(response.statusCode !== 200) {
                callback();
                return;
            }
            // Parse the document body
            var $ = cheerio.load(body);
            var isWordFound = searchForWord($, SEARCH_WORD);
            if(isWordFound) {
                console.log('Word ' + SEARCH_WORD + ' found at page ' + url);
            } else {
                collectInternalLinks($);
                // In this short program, our callback is just calling crawl()
                callback();
            }
        });

    }

    function searchForWord($, word) {
        var bodyText = $('html > body').text().toLowerCase();
        return(bodyText.indexOf(word.toLowerCase()) !== -1);
    }

    function collectInternalLinks($) {
        var relativeLinks = $("a[href^='/']");
        console.log("Found " + relativeLinks.length + " relative links on page");
        relativeLinks.each(function() {
            pagesToVisit.push(baseUrl + $(this).attr('href'));
        });
    }
    fs.readFile( __dirname + "/" +'pagesFile.txt', 'utf8', function (err, data) {
        res.end( data );
    });

})


var server = app.listen(3001, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})