function(event){
                if(that.opts.allowZoom){
                    var selector = $(event.target),
                        img = $('img', selector),
                        src = img.attr('src'),
                        highSrc = img.attr('data-img'),
                        imgWidth;

                    if(that.opts.currentDisplay == 'double'){
                        imgWidth = that.opts.newMagWidth;
                    } else {
                        imgWidth = that.opts.newMagWidth * 2;
                    }

                    that.zoom.show(src, highSrc, imgWidth);
                    return false;
                }
            }