function(event) {

            if (self.startMode == 1) {
              // single touch
              deltaX = (event.touches[0].pageX - self.startX) / self.ctxt.canvas.width;
              deltaY = (event.touches[0].pageY - self.startY) / self.ctxt.canvas.height;
              selection = $('#sliceModeBar').data('selected');
              if ( selection == 'ThreeD' ) {
                self.requestAndRender({mode: 'drag', orbitX: deltaX, orbitY: deltaY});
              } else {
                scrollTo = (1. * event.touches[0].pageY) / self.ctxt.canvas.height;
                self.requestAndRender({scrollTo: scrollTo, size: 'native'});

                if (typeof self.ganged_ViewControl !== 'undefined') {
                  self.ganged_ViewControl.requestAndRender({copySliceGeometryFrom: self.view, size: 'native'});
                }
              }
            } else {
              // multitouch (only look at first 2 touch points)
              nowX = (event.touches[0].pageX + event.touches[1].pageX)/2.;
              nowY = (event.touches[0].pageY + event.touches[1].pageY)/2.;

              nowX -= self.canvas.offsetLeft;
              nowY -= self.canvas.offsetTop;

              self.pan = {
                x: (nowX - self.startX) + self.startPan.x,
                y: (nowY - self.startY) + self.startPan.y
              };

              dx = event.touches[0].pageX - event.touches[1].pageX;
              dy = event.touches[0].pageY - event.touches[1].pageY;
              nowDist = Math.sqrt( dx*dx + dy*dy );

              self.zoom = self.startZoom * nowDist / self.startDist;

              panZoom = {pan: self.pan, zoom: self.zoom, zoomCenter: self.zoomCenter};

              self.setPanZoom(panZoom);
              self.render();

              if (typeof self.ganged_ViewControl !== 'undefined') {
                self.ganged_ViewControl.setPanZoom(panZoom);
                self.ganged_ViewControl.render();
              }
            }

            event.preventDefault();
        }