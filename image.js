var fs = require('fs'),
    request = require('request');

    var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
    };

    download('https://cf.shopee.vn/file/9bd2f362e11c5b23c91561e9f938f2be', 'image/google.png', function(){
    console.log('done');
    });