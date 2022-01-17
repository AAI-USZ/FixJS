function downloadCef(version,cb){

    var zlib = require('zlib')
      , tar = require('tar')
      , distUrl = 'https://github.com/downloads/milani/appjs'
      , version = version
      , dirname = 'cef_binary_' + version + '_' + platform + '_' + arch
      , fileName = dirname + '.tar.gz';

    var tarballUrl = distUrl + '/' + fileName
      , gunzip     = zlib.createGunzip()
      , extracter  = tar.Extract({ path: depsDir });

    var errorHandler = function(err,res){
        if ( err || res.statusCode != 200 ) {
            cb(err || new Error(res.statusCode + ' status code downloading tarball'));
        }
    };

    var finish = function() {
      if(platform == 'win32') {

        try {
          fs.rmdirSync( path.join(depsDir,'cef') );
        } catch(e) {};

        fs.rename(path.join(depsDir, dirname), path.join(depsDir,'cef'),cb);
      } else {

        try {
          fs.unlinkSync( path.join(depsDir,'cef') );
        } catch(e) {};

        fs.symlink( path.join(depsDir, dirname), path.join(depsDir,'cef') ,cb);
      }
    };

    gunzip.on('error', errorHandler)
    extracter.on('error', errorHandler)
    extracter.on('end', finish)

    fs.exists(path.join(depsDir, dirname), function(exists) {
      if (!exists) {
        download(tarballUrl,errorHandler)
          .pipe(gunzip)
          .pipe(extracter);
      } else {
        finish();
      }
    });
}