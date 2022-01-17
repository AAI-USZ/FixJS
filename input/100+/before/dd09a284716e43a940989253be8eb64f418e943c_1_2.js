function() {
            // create page
            var page = new Toe.Model.Page();

            // add canvas element to the element tied to the jQuery plugin
            var canvas = $("<canvas>").attr("id", settings.canvasid);

            var canvasDims = [settings.width, settings.height];
            if (settings.bgimgpath) {
                canvasDims = [imgDims.width, imgDims.height];
            }
            else {
                // derive canvas dimensions from mei facs
                canvasDims = page.calcDimensions($(mei).find("zone"));
            }

            // calculate scale based on width, maintaining aspect ratio
            page.setPageScale(settings.width/canvasDims[0]);
            page.setDimensions(Math.round(canvasDims[0]), Math.round(canvasDims[1]));

            // make canvas dimensions the size of the page
            canvas.attr("width", page.width);
            canvas.attr("height", page.height);
            canvas.attr("style", "border: 4px black solid;");

            elem.prepend(canvas);

            var canvasOpts = {renderOnAddition: false};
            if (settings.bgimgpath) {
                $.extend(canvasOpts, {backgroundImage: settings.bgimgpath,
                                      backgroundImageOpacity: settings.bgimgopacity,
                                      backgroundImageStretch: true});
            }
            rendEng.setCanvas(new fabric.Canvas(settings.canvasid, canvasOpts));

            if (settings.debug) {
                // add FPS debug element
                var fpsDebug = $("<div>").attr("id", "fps");
                fpsDebug.attr("style", "color: red; font-size: 200%");
                elem.prepend(fpsDebug);

                rendEng.canvas.onFpsUpdate = function(fps) {
                    $(fpsDebug).html('FPS: ' + fps);
                };
            }

            /***************************
             * Instantiate MVC classes *
             ***************************/
            // VIEWS
            var pView = new Toe.View.PageView(rendEng);

            // CONTROLLERS
            var pCtrl = new Toe.Ctrl.PageController(page, pView);

            if (mei) {
                loadMeiPage(page);
            }

            // instantiate appropriate GUI elements
            var gui = new Toe.View.GUI(settings.prefix, settings.filename, rendEng, page,
                                      {sldr_bgImgOpacity: settings.bgimgpath, 
                                       initBgImgOpacity: settings.bgimgopacity});

            var runTime = new Date() - startTime;
            console.log("Neon.js ready (" + runTime + "ms)");
        }