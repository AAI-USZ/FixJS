function(cb) {
        if (params.params["deployconf"]["params"]["devices"].indexOf("tablet")==-1) return cb(); //TODO sub-device support
        if (!params.options["ios-ipad-landscape"]) return cb();

        base = "Resources/splash/_base."+params.options["ios-ipad-landscape"].ext;
        runtime.copy(params.options["ios-ipad-landscape"].url,base,function(err) {

          runtime.imagemagick("convert",base+" -resize 2048x1536! Resources/splash/Default-Landscape@2x~ipad.png",function(err) {
            runtime.imagemagick("convert",base+" -resize 1024x768! Resources/splash/Default-Landscape~ipad.png",function(err) {
              runtime.deleteFile(base,cb);
            });
          });
          
          
        });
      }