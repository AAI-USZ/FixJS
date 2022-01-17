function (scrollElement) {
            var $se = $(scrollElement);
            this.logger("Controller.update() scrollElement:" + scrollElement);
            var $base = $se.parents("." + this.baseClass);
            var $bar = $base.find("." + this.trackClass);
            var $wrapper = $base.find("." + this.wrapperContentClass);
            var $slider = $base.find("." + this.sliderClass );
            $bar.width(this.trackWidth);

            var ss_height = $se.outerHeight(true);
            var ss_deltaH = ss_height - $se.height();
            if( $se.is("ul") ){
                $wrapper.width( $se.children(":first").width() );
                var max_height = $se.css("max-height");
                if( max_height ){
                    ss_height = parseInt( max_height.replace("px","") );
                }
            } else {
                $wrapper.width(scrollElement.scrollWidth);
            }

            this.activeScroll(scrollElement, $bar);
            $base.width($wrapper.outerWidth() + $bar.outerWidth());

            $base.height(ss_height);
            $bar.height(ss_height);
            $wrapper.height(ss_height);

            if( this.sliderHeight * 0.9 > ss_height){
                $("." + this.sliderClass).height(ss_height*0.5);
            } else {
                $("." + this.sliderClass).height(this.sliderHeight);
            }

            //var left = $bar.position().left - $slider.width();
            var left = $bar.position().left;
            this.logger("updateSize() - left:" + left);
            $slider.css("left", left);
        }