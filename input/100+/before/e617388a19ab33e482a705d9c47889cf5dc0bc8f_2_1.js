function(win, pos, dim, scale){
      // Google Chrome doesn't support CanvasRenderingContext2D#drawWindow
      var ret = new Deferred();
      var width = win.innerWidth;
      chrome.extension.sendRequest(TBRL.id, {
        request: "capture"
      }, function(res){
        var img = new Image();
        img.addEventListener('load', function(ev){
          img.removeEventListener('load', arguments.callee, false);
          scale = (img.naturalWidth === width)? null : img.naturalWidth / width;
          var canvas = document.createElement('canvas');
          var size = {w: 0, h: 0};
          var ctx = canvas.getContext('2d');
          if(scale){
            scale  = scale.w? scale.w/dim.w :
              scale.h? scale.h/dim.h : scale;
            canvas.width  = size.w = dim.w;
            canvas.height = size.h = dim.h;
            dim.w *= scale;
            dim.h *= scale;
            pos.x *= scale;
            pos.y *= scale;
          } else {
            canvas.width  = size.w = dim.w;
            canvas.height = size.h = dim.h;
          }
          ctx.drawImage(img, pos.x, pos.y, dim.w, dim.h, 0, 0, size.w, size.h);
          base64ToFileEntry(canvas.toDataURL('image/png', '')).addCallback(function(url) {
            ret.callback(url);
          });
        }, false);
        img.src = res;
      });
      return ret;
    }