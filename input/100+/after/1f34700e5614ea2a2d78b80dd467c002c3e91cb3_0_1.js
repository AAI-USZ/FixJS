function () {
      if (req.headers['content-type'] && req.headers['content-type'].indexOf('boundary=') >= 0) {
        var boundary = req.headers['content-type'].split('boundary=')[1];
        text = text.replace(/__BOUNDARY__/g, boundary);
      }
      if (r !== text) console.log(r, text);
      assert.equal(r, text)
      resp.writeHead(200, {'content-type':'text/plain'})
      resp.write('OK')
      resp.end()
    }