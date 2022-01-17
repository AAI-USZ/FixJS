function(){
            if( typeof( slides ) === "undefined" || slides === null ) slides = [];

            base.slides = slides;
            base.count = slides.length;
            base.$el.width(base.count * base.$el.width());

            base.options = $.extend({},$.inlineSlides.defaultOptions, options);
            // determine slide width from the wrapper div if not given as an option
            base.slideWidth = base.options.width || base.$el.parent().width();

            for (var i = 0; i < base.slides.length; i++) {
                var slide = base.slides[i];
                var slideContent;
                if (base.options.type == 'div'){
                    slideContent = '<div style="width:'+base.slideWidth+'px; background-image: url(' + slide.image + ');"></div>';
                    if(slide.link){
                        slideContent = $(slideContent).data('link', slide.link);
                        slideContent.click(function(){
                            document.location.href = $(this).data('link');
                        }).css('cursor', 'pointer');
                    }
                    base.$el.append(slideContent);
                }
                else if (base.options.type == 'img'){
                    slideContent = '<img src="'+slide.image+'" alt="'+slide.title+'"/>';
                    if(slide.link)
                        base.$el.append('<a href="' + slide.link + '">' + slideContent + '</a>');
                    else
                        base.$el.append(slideContent);
                }

                if(base.slides.length > 1){
                    var link = $('<a href="#"><li></li></a>');
                    link.click(base.clickLink);
                    base.options.pager.append(link);
                }
            }

            //Add all CSS3 transition property with vendorPrefixes
            for (var n = 0; n < vendorPrefixes.length; n++) {
                var prefix = '-' + vendorPrefixes[n].toLowerCase() + '-transition';
                var propertyValue = 'all ' + base.options.duration + ' ' + base.options.easing;
                base.$el.css(prefix, propertyValue);
            }
            base.$el.css('transition', 'all ' + base.options.duration + ' ' + base.options.easing);

            if ($.fn.touchwipe) {
                base.$el.touchwipe({
                     wipeLeft: base.slideLeft,
                     wipeRight:base.slideRight,
                     min_move_x: 50,
                     min_move_y: 50,
                     preventDefaultEvents: true
                });
            }

            base.transformProp = base.getCSSProp('transform');
            base.transitionProp = base.getCSSProp('transition');
            base.showSlideNr(0);
        }