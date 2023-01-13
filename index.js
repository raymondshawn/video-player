const app = require('express')()
const path = require('node:path');
const fs = require('fs');
const video = path.join(__dirname, '/public/Scarface _ Push It to the Limit(480P).mp4');
const stat = fs.statSync(video)


const port = process.env.PORT || 8080;

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));




});

app.get('/video', (req, res) => {


  res.writeHead(200, {
    'Content-Type': 'video/mp4',
    'Content-Length': stat.size
  });


  var readStream = fs.createReadStream(video);
  // We replaced all the event handlers with a simple call to readStream.pipe()
  readStream.on('open', function () {
    // This just pipes the read stream to the response object (which goes to the client)
    readStream.pipe(res);
  });

  readStream.on('error', function (err) {
    res.end(err);
  });
})
app.listen(port);
