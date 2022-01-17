function(args) {
          args = typeof args !== 'undefined' ? args : {};
          force = typeof args.force !== 'undefined' ? args.force : false;

          self.imageObj.onload = function() {
            self.requestingImage = false;
            self.render();
            if (self.nextImageSource != '') {
              self.requestingImage = true;
              self.imageObj.src = self.nextImageSource;
              self.nextImageSource = '';
            }
          };

          var time = (new Date()).getTime();
          selection = $('#sliceModeBar').data('selected');

          if (self.view_color != "") {
            view = self.view_color;
          }

          if ( selection == 'ThreeD' ) {
            src = "slicer/threeD?view=1"
          } else {
            src = "slicer/slice?view=" + view + "&orientation=" + selection;

            if (typeof args.offset !== 'undefined') {
              src += "&offset=" + args.offset;
            }
            if (typeof args.scrollTo !== 'undefined') {
              src += "&scrollTo=" + args.scrollTo;
            }
          }

          if (typeof args.mode !== 'undefined') {
            src += "&mode=" + args.mode;
          }
          if (typeof args.size !== 'undefined') {
            src += "&size=" + args.size;
          }
          if (typeof args.orbitX !== 'undefined') {
            src += "&orbitX=" + args.orbitX;
          }
          if (typeof args.orbitY !== 'undefined') {
            src += "&orbitY=" + args.orbitY;
          }
          if (typeof args.panX !== 'undefined') {
            src += "&panX=" + args.panX;
          }
          if (typeof args.panY !== 'undefined') {
            src += "&panY=" + args.panY;
          }
          if (typeof args.zoom !== 'undefined') {
            src += "&zoom=" + args.zoom;
          }
          if (typeof args.roll !== 'undefined') {
            src += "&roll=" + args.roll;
          }
          src += "&time=" + time;
          src += "&fmt=" + "png";

          if ( force ) {
            //self.stopDownloads();
            self.nextImageSource == '';
          }
          if ( !self.requestingImage ) {
            self.requestingImage = true;
            self.imageObj.src = src;
            self.nextImageSource = '';
          } else {
            self.nextImageSource = src;
          }
        }