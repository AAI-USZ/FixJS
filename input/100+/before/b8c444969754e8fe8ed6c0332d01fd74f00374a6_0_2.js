function (index, currImageWrapper) {
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

                    }