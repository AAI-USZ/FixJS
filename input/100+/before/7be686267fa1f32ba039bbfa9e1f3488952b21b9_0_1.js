function downloadCef(version,cb){

    var zlib = require('zlib')
      , tar = require('tar')
      , distUrl = 'https://github.com/downloads/milani/appjs'
      , version = version
      , fileName = 'cef_binary_' + version + '_' + platform + '_' + arch + '.tar.gz';

    var tarballUrl = distUrl + '/' + fileName
      , gunzip     = zlib.createGunzip()
      , extracter  = tar.Extract({ path: depsDir });

    var errorHandler = function(err,res){
        if ( err || res.statusCode != 200 ) {
            cb(err || new Error(res.statusCode + ' status code downloading tarball'));
        }
    }

    gunzip.on('error', errorHandler)
    extracter.on('error', errorHandler)
    extracter.on('end', function(){

        if(platform == 'win32') {
          
          try {
            fs.rmdirSync( path.join(depsDir,'cef') );
          } catch(e) {};

          fs.rename(path.join(depsDir,fileName.replace('.tar.gz','')), path.join(depsDir,'cef'),cb);
        } else {
          
          try {
            fs.unlinkSync( path.join(depsDir,'cef') );
          } catch(e) {};

          fs.symlink( path.join(depsDir,fileName.replace('.tar.gz','')), path.join(depsDir,'cef') ,cb);
        }
    })

    download(tarballUrl,errorHandler)
      .pipe(gunzip)
      .pipe(extracter);
}