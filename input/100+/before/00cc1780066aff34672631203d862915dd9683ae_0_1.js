function(block) {
    var assetCache, cacheHeaders, cachePath, expirationDate, fonts, gzip, gzipHeaders, images, javascripts, paths, stylesheets, upload;
    gzip = require('gzip');
    cachePath = "tmp/asset-cache.json";
    if (!_path.existsSync("tmp")) {
      fs.mkdirSync("tmp");
    }
    assetCache = File.exists(cachePath) ? JSON.parse(File.read(cachePath)) : {};
    _console.debug("Uploading to " + Tower.secrets.s3.bucket);
    images = _.select(File.files("public/images"), function(path) {
      return !!path.match(/\.(gif|ico|png|jpg)$/i);
    });
    fonts = _.select(File.files("public/fonts"), function(path) {
      return !!path.match(/\.(tff|woff|svg|eot)$/i);
    });
    stylesheets = _.select(File.files("public/assets"), function(path) {
      return !!path.match(/-[a-f0-9]+\.(css)$/i);
    });
    stylesheets = _.map(stylesheets, function(path) {
      return path.replace(/^public\/assets/, "stylesheets");
    });
    javascripts = _.select(File.files("public/assets"), function(path) {
      return !!path.match(/-[a-f0-9]+\.(js)$/i);
    });
    javascripts = _.map(javascripts, function(path) {
      return path.replace(/^public\/assets/, "javascripts");
    });
    paths = _.map(images.concat(fonts).concat(stylesheets).concat(javascripts), function(path) {
      return path.replace(/^public\//, "");
    });
    expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 1000 * 60 * 60 * 24 * 365);
    cacheHeaders = {
      "Cache-Control": "public",
      "Expires": expirationDate.toUTCString()
    };
    gzipHeaders = {
      "Content-Encoding": "gzip",
      "Vary": "Accept-Encoding"
    };
    process.on('exit', function() {
      return File.write(cachePath, JSON.stringify(assetCache, null, 2));
    });
    process.on('SIGINT', function() {
      return process.exit();
    });
    upload = function(path, next) {
      var cached, headers;
      _console.debug("Uploading /" + path);
      headers = _.extend({}, cacheHeaders);
      if (!!path.match(/^(stylesheets|javascripts)/)) {
        headers = _.extend(headers, gzipHeaders, {
          "Etag": File.pathFingerprint(path)
        });
      } else {
        headers = _.extend(headers, {
          "Etag": File.digest("public/" + path)
        });
      }
      cached = assetCache[path];
      if (!(cached && cached["Etag"] === headers["Etag"])) {
        cached = _.extend({}, headers);
        return block("public/" + (path.replace(/^(stylesheets|javascripts)/, "assets")), "/" + path, headers, function(error, result) {
          return process.nextTick(function() {
            assetCache[path] = cached;
            return next(error);
          });
        });
      } else {
        return next();
      }
    };
    return Tower.async(paths, upload, function(error) {
      if (error) {
        console.log(error);
      }
      return File.write(cachePath, JSON.stringify(assetCache, null, 2));
    });
  }