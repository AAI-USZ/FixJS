function(){ //onmouseout
                    $(this).find('.zoomer').stop(false,true).fadeOut('500');
                    $(this).find('.zoomlens').stop(false,true).fadeOut('500');
                    if(options.zoomIndicator){
                        $(this).find('.zoomindicator').stop(true,true).delay(150).fadeIn(150);
                    }

                }