function (pic, currImageWrapper) {
        
                var src = pic.src;

                if (supportsCanvas && (!($.browser.msie && $.browser.version == '9.0'))) {

                    var currWidth = $(currImageWrapper).find('img').width(),
                        currHeight = $(currImageWrapper).find('img').height(),
                        realWidth = pic.width,
                        realHeight = pic.height;

                    //adding the canvas
                    $('<canvas width="' + realWidth + '" height="' + realHeight + '"></canvas>').prependTo(currImageWrapper);
                    //getting the canvas
                    var currCanvas = $(currImageWrapper).find('canvas');
                    //setting the canvas position on the Pics
                    $(currCanvas).css({
                        'position': 'absolute',
                        top: 0,
                        left: 0,
                        width: currWidth,
                        height: currHeight,
                        display: invertHoverEffect ? 'none' : 'block'
                    });

                    greyImages(pic, currCanvas[0], realWidth, realHeight);

                    if (hoverEffect) {
                        $(currImageWrapper).mouseenter(function () {
                            if(!invertHoverEffect) {
                                $(this).find('canvas').stop(true, true).fadeOut();
                            } else {
                                $(this).find('canvas').stop(true, true).fadeIn();
                            }
                        });
                        $(currImageWrapper).mouseleave(function () {
                            if(!invertHoverEffect) {
                                $(this).find('canvas').stop(true, true).fadeIn();
                            } else {
                                $(this).find('canvas').stop(true, true).fadeOut();
                            }
                        });
                    }
                } else {

                    var ieWidth = $(currImageWrapper).find('img').prop('width');
                    var ieHeight = $(currImageWrapper).find('img').prop('height');

                    //adding the canvas
                    $('<img src=' + src + ' width="' + ieWidth + '" height="' + ieHeight + '" class="ieFix" /> ').prependTo(currImageWrapper);
                    $('.ieFix').css({
                        'position': 'absolute',
                        top: 0,
                        left: 0,
                        'filter': 'progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)',
                        display: invertHoverEffect ? 'none' : 'block'
                    });

                    if (hoverEffect) {
                        $(currImageWrapper).mouseenter(function () {
                            if(!invertHoverEffect) {
                                $(this).children('.ieFix').stop(true, true).fadeOut();
                            } else {
                                $(this).children('.ieFix').stop(true, true).fadeIn();
                            }
                        });
                        $(currImageWrapper).mouseleave(function () {
                            if(!invertHoverEffect) {
                                $(this).children('.ieFix').stop(true, true).fadeIn();
                            } else {
                                $(this).children('.ieFix').stop(true, true).fadeOut();
                            }
                        });
                    }
                }
            }