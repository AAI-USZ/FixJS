function ( scripts ){
      var key = this.parentView ?
        this.parentView.view :
        this.filename;

      if( !cache.js[ key ]){
        var js   = config.js;
        var tmp  = '';
        var path = asset_host_total > 0 ?
          function ( group ){
            var tmp = '<script src="' + asset_host[ asset_host_current ] + '/' + group +
              '-' + version.js[ group ] + '.js"></script> ';

            asset_host_counter();

            return tmp;
          } :
          function ( group ){
            return '<script src="/' + config.path.output + '/' + group +
              '-' + version.js[ group ] + '.js"></script> ';
          };

        scripts.forEach( function ( group ){
          js[ group ].cdn && js[ group ].cdn.forEach( function ( script ){
            tmp += '<script src="' + script + '"></script> ';
          });

          tmp += path( group );
        });

        cache.js[ key ] = tmp;
      }

      return cache.js[ key ];
    }