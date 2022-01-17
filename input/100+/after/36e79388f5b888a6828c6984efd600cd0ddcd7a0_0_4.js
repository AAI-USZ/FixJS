function( x, y, w, h, includeOverlay, buffer ) {

        var $upscale = this.upscale,

            zoom = this.zoom;



        if ( $upscale ) {

            if ( Math.abs(w) < 1 ) {

                if ( w < 1 ) {

                    w = w;

                } else {

                    w = -1;

                }

            }



            if ( Math.abs(h) < 1 ) {

                if ( h < 1 ) {

                    h = 1;

                } else {

                    h = -1;

                }

            }



            /*

             * This is to allow easier usage.

             * So you can update in the negative direction.

             */

            if ( w < 0 ) {

                w = -w;

                x -= w;

            }



            if ( h < 0 ) {

                h = -h;

                y -= h;

            }



            if ( buffer !== undefined ) {

                x -= buffer;

                y -= buffer;

                h += buffer*2;

                w += buffer*2;

            }



            /*

             * After handling the buffer, and other possible values,

             * if the width/height are empty, then quit early.

             */

            if ( w === 0 || h === 0 ) {

                return false;

            }



            var canvas = this.canvas,

                upscale = $upscale.get(0),

                viewport = this.viewport,

                $canvas = this.$canvas;



            // 1) handle the no-args version (update whole screen)

            if ( x === undefined ) {

                /*

                 * The maths for this bit proved to be really difficult to work out.

                 * It would be out by just a couple of sub-pixels (no idea why).

                 *

                 * So we just fake a draw event (drawing to top left corner),

                 * and it's drawing to the whole canvas (full with/height).

                 */

                var pos = this.viewport.offset();

                var fakeEv = $.Event( 'mousemove', {

                        pageX : pos.left,

                        pageY : pos.top

                });



                var location = this.translateLocation( fakeEv );



                x = location.left;

                y = location.top;

                w = this.width;

                h = this.height;

            }



            // take off 1 to account for the canvas border

            var scrollTop  = this.viewport.scrollTop(),

                scrollLeft = this.viewport.scrollLeft();



            // 2) work out how much of the drawing canvas is actually visible

            x = Math.max( x,

                    scrollLeft / zoom

            );

            y = Math.max( y,

                    scrollTop / zoom

            );

            w = Math.min( w,

                    Math.min(canvas.width , this.viewport.width()/zoom )

            );

            h = Math.min( h,

                    Math.min(canvas.height, this.viewport.height()/zoom )

            );



            /* Check for updating outside of the canvas,

             * and if so, we leave early (no refresh needed).

             */

            if ( x+w < 0 || y+h < 0 || x > this.canvas.width || y > this.canvas.height ) {

                return false;

            }



            /* Need to be rounded for the canvas data we access later. */

            x = Math.round(x);

            y = Math.round(y);



            w = Math.round(w);

            h = Math.round(h);



            /*

             * Widen the draw area by a pixel to encompas the outer edge,

             * this is to prevent slight 1px gaps along the edges of the upscale canvas.

             */



            if ( x > 0 ) {

                x--;

            }



            if ( y > 0 ) {

                y--;

            }



            var wDiff = Math.min( 1, canvas.width  - w ),

                hDiff = Math.min( 1, canvas.height - h );



            w += wDiff;

            h += hDiff;



            // 3) work out the same locations, on the upscale canvas

            var ux, uy, uw, uh ;



            ux = x*zoom - scrollLeft;

            uy = y*zoom - scrollTop;

            uw = w*zoom;

            uh = h*zoom;



            // clear our refresh area

            var ctx = canvas.ctx,

                destAlpha = ( ctx.globalCompositeOperation == 'source-atop' ),

                uCtx = upscale.ctx;



            /*

             * This can go one of three ways:

             *  = draw using downscaling (zoom is 100%, or lower)

             *  = draw cheap (using canvas scaling) and sub-divide work

             *  = manually upscale pixels

             */



            var divideWork = (w*h) > ((UPSCALE_DIVIDE_AREA+6)*(UPSCALE_DIVIDE_AREA+6));



            if ( divideWork || zoom <= 1 ) {

                var xDiff = Math.max( 0, (x+w) - canvas.width  ),

                    yDiff = Math.max( 0, (y+h) - canvas.height );



                var ux2 = Math.round(ux),

                    uy2 = Math.round(uy),

                    uw2 = Math.round(uw - xDiff*zoom),

                    uh2 = Math.round(uh - yDiff*zoom);



                // if we clip the edge,

                // then clamp the max width/height onto the edges

                // (otherwise Chrome crashes)

                if ( x+w > canvas.width ) {

                    w -= (x+w) - canvas.width;

                    uw2 = upscale.width - ux2;

                }

                if ( y+h > canvas.height ) {

                    h -= (y+h) - canvas.height;

                    uh2 = upscale.height - uy2;

                }



                /*

                 * Note that the zoom _must_ be first,

                 * so it takes precendence over dividing work

                 * (as it's much cheaper).

                 */

                /*

                 * If zoom is at 1, then there is no change in scaing.

                 * So we just draw normally, and quit.

                 */

                if ( zoom <= 1 ) {

                    uCtx.clearRect( ux2, uy2, uw2, uh2 );



                    uCtx.globalAlpha = 1.0;

                    uCtx.drawImage( canvas, x, y, w, h, ux2, uy2, uw2, uh2 );



                    if ( includeOverlay ) {

                        if ( destAlpha ) {

                            uCtx.globalCompositeOperation = 'source-atop';

                        }



                        uCtx.drawImage( this.overlay, x, y, w, h, ux2, uy2, uw2, uh2 );



                        if ( destAlpha ) {

                            uCtx.globalCompositeOperation = 'source-over';

                        }

                    }



                /*

                 * Sub divide up work if we'll be doing loads of it.

                 * Instead the work is done over multiple calls.

                 */

                } else if ( divideWork ) {

                    // cheap draw, so we don't get huge empty areas

                    uCtx.drawImage( canvas, x, y, w, h, ux2, uy2, uw2, uh2 );



                    for ( var i = x; i < (w+x); i += UPSCALE_DIVIDE_AREA ) {

                        for ( var j = y; j < (h+y); j += UPSCALE_DIVIDE_AREA ) {

                            var updateW = Math.min( (w+x)-i, UPSCALE_DIVIDE_AREA ),

                                updateH = Math.min( (h+y)-j, UPSCALE_DIVIDE_AREA );



                            this.futureRefreshUpscale( i, j, updateW, updateH, includeOverlay );

                        }

                    }

                }

            } else {

                // 5) draw!

                copyNearestNeighbour(

                        upscale,                        // dest

                        ux, uy, uw, uh,                 // dest x, y, w, h

                        zoom, zoom,                     // dest pixel size



                        ctx.getImageData(x, y, w, h),   // src

                        x, y, w, h,                     // src  x, y, w, h

                        includeOverlay ? this.overlay.ctx.getImageData( x, y, w, h ) : nil,



                        ( ctx.globalCompositeOperation == 'source-atop' ) // bitmask pixels

                );

            }

        }



        return true;

    }