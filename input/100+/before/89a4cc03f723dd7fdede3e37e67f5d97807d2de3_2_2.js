function( items, callback, error, ordered ){
        if( items instanceof Array && items.length > 0 ){
          var onLoad = generateLoaderCallback( items, callback );
          if( !ordered ){
            for( var i = 0; i < items.length; ++i ){
              Loader.load( items[ i ], onLoad );
            }
          }
          else {
            var next = generateNextFunction( items, callback );
            next();
          }

        }
        else {
          var item = items;

          if( _loaders[ item.type ] ){
            if( item.url ){
              _loaders[ item.type ]( item.url, item.exclude, callback, item.check, error );
            }
            else{
              throw new Error( "Attempted to load resource without url." );
            }
          }
          else {
            throw new Error( "Loader type " + item.type + " not found! Attempted: " + item.url );
          }

        }
      }