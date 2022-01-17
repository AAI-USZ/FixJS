function (options) {
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
            }