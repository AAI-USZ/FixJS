function()
            {
                var goodWidth = (data.maxWidth < 1 || $(document).width() < data.maxWidth) ? $(document).width() : data.maxWidth;
                var goodMargin = (($(document).width()-goodWidth)/2);
                //resize
                $(settings.selector+' > div').each(function() {
                    $(this).css('width', goodWidth-20);
                    $(this).css('margin-left', goodMargin);
                    $(this).css('margin-right', goodMargin);
                });
                //recalculate
                data.eachElement = $(settings.selector+' > div:first-child').outerWidth(true);
                data.outerMargin = $(document).width()/2;
                data.totalWidth = (2*data.outerMargin)+(data.noElement*data.eachElement);
                data.maxSlideLeft = -((data.totalWidth-data.eachElement)+data.outerMargin);
                data.maxSlideRight = data.outerMargin;
                settings.bigThreshold = data.eachElement/4;
                //slide back
                $(settings.selector).css({'width':data.totalWidth, 'padding-left':data.outerMargin, 'padding-right':data.outerMargin });
                methods.slide(data.currentSlide);
            }