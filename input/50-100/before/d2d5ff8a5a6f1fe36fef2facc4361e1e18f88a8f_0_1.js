function(){ //onmouseout
                    $(this).find('.zoomer').stop(false,true).fadeOut('500');
                    $(this).find('.zoomlens').stop(false,true).fadeOut('500');
                    if(options.zoomIndicator){
                        $(this).find('.zoomindicator').clearQueue().delay(250).fadeIn(150);
                    }

                }