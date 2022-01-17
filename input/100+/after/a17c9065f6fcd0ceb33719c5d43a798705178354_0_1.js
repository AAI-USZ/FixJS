function(){
            if( typeof( slides ) === "undefined" || slides === null ) slides = [];

            base.slides = slides;
            base.count = slides.length;

            base.options = $.extend({},$.inlineSlides.defaultOptions, options);

            for (var i = 0; i < base.slides.length; i++) {
                var slide = base.slides[i];
                base.$el.append('<img src="'+slide.image+'" alt="'+slide.title+'"/>');
                if(base.slides.length > 1){
                    var link = $('<a href="#"><li></li></a>');
                    link.click(base.clickLink);
                    base.options.pager.append(link);
                }
            }
            base.$el.width(base.count*base.options.slideWidth);

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