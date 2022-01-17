function(srcFiles, dest, options, callback) {
    var fstream = require("fstream");
    var tar = require("tar");
    var zlib = require("zlib");

    var destDir = path.dirname(dest);
    var destFile = path.basename(dest);
    var destFileExt = path.extname(destFile);
    var tempDir = path.join(destDir, "tar_" + (new Date()).getTime());
    var tarDir = _(destFile).strLeftBack(destFileExt);

    var tarProcess;

    tarDir = path.join(tempDir, tarDir);

    tempCopy(srcFiles, tarDir, options);

    var reader = fstream.Reader({path: tarDir, type: "Directory"});
    var packer = tar.Pack();
    var gzipper = zlib.createGzip();
    var writer = fstream.Writer(dest);

    if (options.mode == "tgz") {
      tarProcess = reader.pipe(packer).pipe(gzipper).pipe(writer);
    } else {
      tarProcess = reader.pipe(packer).pipe(writer);
    }

    tarProcess.on("error", function(e) {
      grunt.log.error(e);
      grunt.fail.warn("tarHelper failed.");
    });

    tarProcess.on("close", function() {
      grunt.helper("clean", tempDir);
      callback(getSize(dest));
    });
  }