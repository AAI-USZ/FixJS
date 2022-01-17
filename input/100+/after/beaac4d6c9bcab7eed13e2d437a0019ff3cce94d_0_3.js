function write(collection, type, fn) {
  // do not write empty files
  if (!collection.content) return false;

  collection.content = this.license.apply(this, arguments);

  // how do we need to output the content to stdout or to a file...
  if (this.stdout) return console.log(collection.content);

  // process the file based output
  var configuration = this.package.configuration
    , output = configuration.dist[type].replace(/^~/g, this.home)
    , file = this.template(output, this.tag.apply(this, arguments))
    , base = path.basename(file)
    , self = this;

  // make sure that the file is saved relative to the location of the
  // square.json file instead of the current directory of where the command is
  // executed
  file = helper.base(file, this.package.path);
  this.logger.info('writing', file);

  // write the actual change to disk
  if (this.env !== 'testing') {
    fs.writeFile(file, collection.content, function written(err) {
      if (err) return self.critical('failed to write ' + base + ' to disk', err);
      if (fn) fn(err, base);
    });
  } else {
    this.logger.info('Not actually writing %s, we are running in test env', file);
  }

  // run the shizzle through zlib so we can show some compression stats
  zlib.gzip(collection.content, function compressed(err, data) {
    // generate some metrics about the whole compilation
    var size = data ? data.length : 0
      , metrics = {
          factor: '' + (Buffer.byteLength(collection.content) / size).toFixed(1)
        , normal: Buffer.byteLength(collection.content).bytes(1)
        , gzip: data ? data.length.bytes(1) : size.toString()
        , type: type
        , file: file
      };

    self.logger.metric(
        base + ': %s normal, %s compressed with a gzip factor of %s'
      , metrics.normal.green
      , metrics.gzip.green
      , metrics.factor.green
    );

    // emit a write
    self.emit('write', collection.content, metrics);
  });
}