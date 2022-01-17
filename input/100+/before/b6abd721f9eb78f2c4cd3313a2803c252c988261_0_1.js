function() {
            // grab canvas element
            self.canvas = document.getElementById(options.id);
            self.ctxt = self.canvas.getContext("2d");
            self.container = document.getElementById(options.containerID);

            self.zoom = 1;
            self.pan = {x: 0, y: 0};
            self.zoomCenter = {x: 0, y: 0};

            self.imageObj = new Image();

            self.canvas.style.width = '100%'
            self.canvas.width = self.canvas.offsetWidth;
            self.canvas.style.width = '';

            self.ctxt.canvas.width = self.container.scrollWidth;
            self.ctxt.canvas.height = window.innerHeight;

            if (options.doTouch) {
              self.canvas.addEventListener('touchstart', self.onTouchStart, false);
              self.canvas.addEventListener('touchmove', self.onTouchMove, false);
              self.canvas.addEventListener('touchend', self.onTouchEnd, false);
            };
            self.canvas.addEventListener('mousedown', self.onMouseDown, false);
            self.canvas.addEventListener('mousemove', self.onMouseMove, false);
            self.canvas.addEventListener('mouseup', self.onMouseUp, false);

            self.mouseDragging = false;
            self.nextImageSource = "";
            self.requestingImage = false;

            self.view_color =
                typeof options.view !== 'undefined' ? options.view : "";
        }