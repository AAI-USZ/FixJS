function handler (req, res) {
  var url = req.url;
  var index = url.indexOf('?');
  if(index > -1){
  	url = url.substr(0, index);
  }
  console.log(url);
  if(url == '/'){
  	url = '/index.html';
  }
  fs.readFile(__dirname + url,
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading ' + url);
    }
    res.writeHead(200);
    res.end(data);
  });
}