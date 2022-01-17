function ( err, stat ){
    var is_dir = stat && stat.isDirectory();
    var _dir   = is_dir ? dir + '/' : dir;
    var _files = [];
    var _dirs  = [];

    if( !is_dir ){
      fs.unlinkSync( _dir );
      return callback( null, _dirs, _files );
    }

    fs.readdir( _dir, function ( err, files ){
      var pending;

      if( err ) return callback( err );

      pending = files.length;

      _dirs.push( _dir );

      if( !pending ){
        fs.rmdirSync( _dir );
        return callback( null, _dirs, _files );
      }

      files.forEach( function ( file ){
        file = _dir + file;

        fs.stat( file, function ( err, stat ){
          if( stat && stat.isDirectory()){
            _dirs.push( file );

            rmdir( file, function ( err, dirs, files ){
              _files = _files.concat( files );

              if( !--pending ){
                _dirs.forEach( function ( dir ){
                  if( path.existsSync( dir )){
                    fs.rmdirSync( dir );
                  }
                });
                callback( null, _dirs, _files );
              }
            });

            return;
          }

          _files.push( file );
          fs.unlinkSync( file );

          if( !--pending ){
            _dirs.forEach( function ( dir ){
              if( path.existsSync( dir )){
                fs.rmdirSync( dir );
              }
            });
            callback( null, _dirs, _files );
          }
        });
      });
    });
  }