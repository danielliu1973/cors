var http = require('http'),
    express = require('express'),
    path = require('path'),
    fs = require('fs');

var rootDir = path.resolve(path.dirname(module.uri));

var app = express();
app.use(express.static(rootDir));
app.get('/', (req, res) => {})

app.get('/pdf', (req, res) => {
  var options = {
    host: 'localhost',
    port: 6234,
    path: '/pdf'
  };

  var file_name = 'testtesttest.pdf';
  var file = fs.createWriteStream(file_name);

  http.get(options, function(r) {
    r.on('data', data => file.write(data)).
    on('end', () => file.end(()=>res.download(file_name)));
  });
});

var server = http.createServer(app);
var port = process.env.PORT || 5234;
server.listen(port);

console.log('http server listening on %d', port);