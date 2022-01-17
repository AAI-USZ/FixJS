function(cb) {
        if (params.params["deployconf"]["params"]["devices"].indexOf("tablet")==-1) return cb(); //TODO sub-device support
        if (!params.options["ios-ipad-portrait"]) return cb();

        base = "Resources/splash/_base."+params.options["ios-ipad-portrait"].ext;
        runtime.copy(params.options["ios-ipad-portrait"].url,base,function(err) {

          runtime.imagemagick("convert",base+" -resize 1536x2048! Resources/splash/Default-Portrait@2x~ipad.png",function(err) {
            runtime.imagemagick("convert",base+" -resize 768x1024! Resources/splash/Default-Portrait~ipad.png",function(err) {
              runtime.deleteFile(base,cb);
            });
          });
          
          
        });
      }