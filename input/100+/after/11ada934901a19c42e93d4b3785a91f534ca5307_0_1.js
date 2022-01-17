function mouseWheel(e) {
            var delta = 0;
            prevTime = prevTime || new Date().getTime();

            try {
                _zoomDiv.scrollTop = 1000;
                _zoomDiv.dispatchEvent(e);
                delta = 1000 - _zoomDiv.scrollTop;
            } catch (error) {
                delta = e.wheelDelta || (-e.detail * 5);
            }

            // limit mousewheeling to once every 200ms
            var timeSince = new Date().getTime() - prevTime;

            function dispatchZoomed() {
                map.dispatchCallback('zoomed');
            }

            if (!ea.running()) {
              var point = MM.getMousePoint(e, map),
                  z = map.getZoom();
              ea.map(map)
                .easing('easeOut')
                .to(map.pointCoordinate(MM.getMousePoint(e, map)).zoomTo(z + (delta > 0 ? 1 : -1)))
                .path('about').run(100, dispatchZoomed);
                prevTime = new Date().getTime();
            } else if (timeSince > 150){
                ea.zoom(ea.to().zoom + (delta > 0 ? 1 : -1)).from(map.coordinate).resetRun();
                prevTime = new Date().getTime();
            }

            // Cancel the event so that the page doesn't scroll
            return MM.cancelEvent(e);
        }