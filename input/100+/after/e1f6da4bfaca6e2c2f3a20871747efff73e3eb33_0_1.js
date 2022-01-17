function(name) {
    var client, fileName, self, sendHTML;
    self = this;
    sendHTML = function(html, code) {
      if (code == null) {
        code = 200;
      }
      self.writeHead(code, {
        'Content-Length': Buffer.byteLength(html),
        'Content-Type': 'text/html'
      });
      return self.end(html);
    };
    try {
      client = typeof name === 'string' && clients[name];
      if (client == null) {
        throw new Error('Unable to find single-page client: ' + name);
      }
      if (options.packedAssets) {
        if (!cache[name]) {
          fileName = pathlib.join(ss.root, options.dirs.assets, client.name, client.id + '.html');
          cache[name] = fs.readFileSync(fileName, 'utf8');
        }
        return sendHTML(cache[name]);
      } else {
        return view(ss, client, options, sendHTML);
      }
    } catch (e) {
      sendHTML('Internal Server Error', 500);
      ss.log('Error: Unable to serve HTML!'.red);
      return ss.log(e);
    }
  }