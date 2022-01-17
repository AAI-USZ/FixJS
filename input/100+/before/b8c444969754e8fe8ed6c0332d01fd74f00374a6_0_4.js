function (options) {
            'use strict';
            var container = this,
                self = this,
                defaults = {
                    hoverEffect: true,
                    webworkerPath: false,
                    responsive: true,
                    invertHoverEffect: false
                };
                options = $.extend(defaults, options);
            //@public vars
            var hoverEffect = options.hoverEffect,
                webworkerPath = options.webworkerPath,
                invertHoverEffect = options.invertHoverEffect,
                responsive = options.responsive;

            //@private var
            var supportsCanvas = !!document.createElement('canvas').getContext,
                $window = $(window);
            /* Check if Web Workers are supported */
            var supportWebworker = (function () {
                    return (typeof (Worker) !== "undefined") ? true : false;
                }());

            var isIE7 = $.browser.msie && +$.browser.version === 7;

            //convert any image into B&W using HTML5 canvas
            function greyImages(img, canvas, width, height) {
                var ctx = canvas.getContext('2d'),
                    currImg = img,
                    i = 0,
                    grey;

                ctx.drawImage(img, 0, 0, width, height);

                var imageData = ctx.getImageData(0, 0, width, height),
                    px = imageData.data,
                    length = px.length;

                // web worker superfast implementation
                if (supportWebworker && webworkerPath) {

                    var BnWWorker = new Worker(webworkerPath + "BnWWorker.js");

                    BnWWorker.postMessage(imageData);

                    BnWWorker.onmessage = function (event) {
                        ctx.putImageData(event.data, 0, 0);
                    };
                } else {

                    // no webworker slow implementation
                    for (; i < length; i += 4) {
                        grey = px[i] * 0.3 + px[i + 1] * 0.59 + px[i + 2] * 0.11;
                        px[i] = px[i + 1] = px[i + 2] = grey;
                    }

                    ctx.putImageData(imageData, 0, 0);
                }
            }

            this.init = function (options) {
                if (supportsCanvas && (!($.browser.msie && $.browser.version == '9.0'))) {

                    $(container).each(function (index, currImageWrapper) {

                        var pic = $(currImageWrapper).find('img');
                        var src = $(pic).prop('src');
                        //getting the Pics proprieties

                        var currWidth = $(pic).width();
                        var currHeight = $(pic).height();

                        //adding the canvas
                        $('<canvas width="' + currWidth + '" height="' + currHeight + '"></canvas>').prependTo(currImageWrapper);
                        //getting the canvas
                        var currCanvas = $(currImageWrapper).find('canvas');
                        //setting the canvas position on the Pics
                        $(currCanvas).css({
                            'position': 'absolute',
                            top: 0,
                            left: 0,
                            display: invertHoverEffect ? 'none' : 'block'
                        });

                        greyImages(pic[0], currCanvas[0], currWidth, currHeight);

                        if (hoverEffect) {
                            $(this).mouseenter(function () {
                                if(!invertHoverEffect) {
                                    $(this).find('canvas').stop(true, true).fadeOut();
                                } else {
                                    $(this).find('canvas').stop(true, true).fadeIn();
                                }
                                
                            });
                            $(this).mouseleave(function () {
                                if(!invertHoverEffect) {
                                    $(this).find('canvas').stop(true, true).fadeIn();
                                } else {
                                    $(this).find('canvas').stop(true, true).fadeOut();
                                }
                            });
                        }

                    });

                } else {
                    $(container).each(function (index, currImageWrapper) {
                        var pic = $(currImageWrapper).find('img');
                        var picSrc = $(currImageWrapper).find('img').prop('src');

                        var currWidth = $(pic).prop('width');
                        var currHeight = $(pic).prop('height');

                        //adding the canvas
                        $('<img src=' + picSrc + ' width="' + currWidth + '" height="' + currHeight + '" class="ieFix" /> ').prependTo(currImageWrapper);
                        $('.ieFix').css({
                            'position': 'absolute',
                            top: 0,
                            left: 0,
                            'filter': 'progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)',
                            display: invertHoverEffect ? 'none' : 'block'
                        });

                    });

                    if (hoverEffect) {
                        $(container).mouseenter(function () {
                            if(!invertHoverEffect) {
                                $(this).children('.ieFix').stop(true, true).fadeOut();
                            } else {
                                $(this).children('.ieFix').stop(true, true).fadeIn();
                            }
                        });
                        $(container).mouseleave(function () {
                            if(!invertHoverEffect) {
                                $(this).children('.ieFix').stop(true, true).fadeIn();
                            } else {
                                $(this).children('.ieFix').stop(true, true).fadeOut();
                            }
                        });
                    }

                }
                if (responsive) {
                    $window.on('resize orientationchange', container.resizeImages);
                }
            };

            this.resizeImages = function () {
                
                $(container).each(function (index, currImageWrapper) {
                    var pic = $(currImageWrapper).find('img:not(.ieFix)');
                    var currWidth,currHeight;
                    if (isIE7) {
                        currWidth = $(pic).prop('width');
                        currHeight = $(pic).prop('height');
                    } else {
                        currWidth = $(pic).width();
                        currHeight = $(pic).height();
                    }

                    $(this).find('.ieFix, canvas').css({
                        width: currWidth,
                        height: currHeight
                    });

                });
            };

            return self.init(options);

        }