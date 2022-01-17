function (newWidth, newHeight, effectDuration, callback) {

        var p,promises,

            highlightId, ratio, width, height, duration, opts = {

            callback: callback || effectDuration

        }, newsize, els, me = this;

        

        function sizeCanvas(canvas, w, h) {

            if ($.mapster.hasCanvas) {

                canvas.width = w;

                canvas.height = h;

            } else {

                $(canvas).width(w);

                $(canvas).height(h);

            }

        }

        function cleanupAndNotify() {



            me.currentAction = '';

            

            if ($.isFunction(opts.callback)) {

                opts.callback();

            }

            

            me.processCommandQueue();

        }

        // handle cleanup after the inner elements are resized

        function finishResize() {

            sizeCanvas(me.overlay_canvas, width, height);



            // restore highlight state if it was highlighted before

            if (opts.highlight && highlightId >= 0) {

                var areaData = me.data[highlightId];

                areaData.tempOptions = { fade: false };

                me.getDataForKey(areaData.key).highlight();

                areaData.tempOptions = null;

            }

            sizeCanvas(me.base_canvas, width, height);

            me.redrawSelections();

            cleanupAndNotify();



        }

        function resizeMapData() {

            $(me.image).css(newsize);

            // start calculation at the same time as effect

            me.scaleInfo = u.getScaleInfo({

                    width: width,

                    height: height

                },

                { 

                    width: me.scaleInfo.realWidth,

                    height: me.scaleInfo.realHeight

                });

            $.each(me.data, function (i, e) {

                $.each(e.areas(), function (i, e) {

                    e.resize();

                });

            });

        }



        

        if (typeof newWidth === 'object') {

            opts = newWidth;

        } else {

            opts.width = newWidth;

            opts.height = newHeight;

            opts.duration = effectDuration || 0;

        }

        width = opts.width;

        height = opts.height;

        duration = opts.duration;



        if (me.scaleInfo.width === width && me.scaleInfo.height === height) {

            return;

        }

        highlightId = me.highlightId;



        

        if (!width) {

            ratio = height / me.scaleInfo.realHeight;

            width = Math.round(me.scaleInfo.realWidth * ratio);

        }

        if (!height) {

            ratio = width / me.scaleInfo.realWidth;

            height = Math.round(me.scaleInfo.realHeight * ratio);

        }



        newsize = { 'width': String(width) + 'px', 'height': String(height) + 'px' };

        if (!$.mapster.hasCanvas) {

            $(me.base_canvas).children().remove();

        }



        // resize all the elements that are part of the map except the image itself (which is not visible)

        // but including the div wrapper

        els = $(me.wrapper).find('.mapster_el').add(me.wrapper);



                if (duration) {

            promises = [];

            me.currentAction = 'resizing';

            els.each(function (i, e) {

                p = when.defer();

                promises.push(p);



                $(e).animate(newsize, {

                    duration: duration,

                    complete: p.resolve,

                    easing: "linear"

                });

            });



            p = when.defer();

            promises.push(p);



            // though resizeMapData is not async, it needs to be finished just the same as the animations,

            // so add it to the "to do" list.

            

            when.all(promises).then(finishResize);

            resizeMapData();

            p.resolve();

        } else {

            els.css(newsize);

            resizeMapData();

            finishResize();

            

        }

    }