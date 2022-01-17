function(cb) {
        if (params.params["deployconf"]["params"]["devices"].indexOf("phone")==-1) return cb(); //TODO sub-device support
        if (!params.options["ios-phone-portrait"]) return cb();

        base = "Resources/Splash/_base."+params.options["ios-phone-portrait"].ext;
        runtime.copy(params.options["ios-phone-portrait"].url,base,function(err) {

          runtime.imagemagick("convert",base+" -resize 640x960! Resources/splash/Default@2x.png",function(err) {
            runtime.imagemagick("convert",base+" -resize 320x480! Resources/splash/Default.png",function(err) {
              runtime.deleteFile(base,cb);
            });
          });
          
          
        });
      }