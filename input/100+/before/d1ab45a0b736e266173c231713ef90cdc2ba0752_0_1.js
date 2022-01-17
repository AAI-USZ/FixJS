function ( styles ){
      if( !cache.css[ this.parentView.view ]){
        var css  = config.css;
        var tmp  = '';
        var path = asset_host_total > 0 ?
          function ( group ){
            var tmp = '<link href="' + asset_host[ asset_host_current ] + '/' + group +
              '-' + version.css[ group ] + '.css" rel="stylesheet" /> ';

            asset_host_counter();

            return tmp;
          } :
          function ( group ){
            return '<link href="/' + config.path.output + '/' + group +
              '-' + version.css[ group ] + '.css" rel="stylesheet" /> ';
          };

        styles.forEach( function ( group ){
          css[ group ].cdn && css[ group ].cdn.forEach( function ( style ){
            tmp += '<link href="' + style + '" rel="stylesheet" /> ';
          });

          tmp += path( group );
        });

        cache.css[ this.parentView.view ] = tmp;
      }

      return cache.css[ this.parentView.view ];
    }