function(index){
            var slide = base.slides[index];
            if (!slide) return;
            base.currentIndex = index;
            if (base.options.detail){
                if(base.options.detail.mobile)
                    base.options.detail.mobile.html(slide.desc.mobile);
                else
                    base.options.detail.html(slide.desc);
            }
            var offset = -1*index*base.$el.parent().width();

            if (base.transformProp && base.transitionProp) {
                base.$el.css(base.transformProp,'translate('+ offset +'px,0)');
                base.$el.css(base.transformProp,'translate3d('+ offset +'px,0,0)');
            }
            else if(base.transitionProp){
                base.$el.css(base.transitionProp,'left ' + offset +'px');
            }
            else {
                base.$el.animate({
                    left: offset
                });
            }
            
            base.options.pager.children().removeClass('active');
            $(base.options.pager.children()[index]).addClass('active');
        }