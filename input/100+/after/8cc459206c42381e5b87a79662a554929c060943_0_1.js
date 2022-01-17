function( err, data, res ) {
          var json;
          if ( err ) { 
            
            try {
              json = JSON.parse( err.data );
            } catch( e ){}
            callback({
              statusCode : err.statusCode,
              message : json ? json.error : data,
              oauth : err.oauth
            }, data, res );
          } else {
            try {
              json = JSON.parse( data );
            } catch( e ){}
            callback( null, json || data );
          }
        }