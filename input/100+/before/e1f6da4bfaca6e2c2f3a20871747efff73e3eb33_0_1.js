function(name) {
    var client, fileName, self, sendHTML;
    self = this;
    sendHTML = function(html) {
      self.writeHead(200, {
        'Content-Length': Buffer.byteLength(html),
        'Content-Type': 'text/html'
      });
      return self.end(html);
    };
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
  }