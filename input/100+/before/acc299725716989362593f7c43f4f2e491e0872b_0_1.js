function(event){
                if(that.opts.allowZoom){
                    var selector = $(event.target),
                        img = $('img', selector),
                        src = img.attr('src'),
                        highSrc = img.attr('data-img');

                    if(that.opts.currentDisplay == 'double'){
                        var width = that.opts.magWidth;
                    } else {
                        var width = that.opts.magWidth * 2;
                    }

                    that.zoom.show(src, highSrc, width);
                    return false;
                }
            }