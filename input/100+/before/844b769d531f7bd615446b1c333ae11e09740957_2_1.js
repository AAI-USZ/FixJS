function (scrollElement) {
            this.logger("Controller.update() scrollElement:" + scrollElement);
            var $base = $(scrollElement).parents("." + this.baseClass);
            var $bar = $base.find("." + this.trackClass);
            var $wrapper = $base.find("." + this.wrapperContentClass);
            $bar.width(this.trackWidth);

            if( $(scrollElement).is("ul") ){
                $wrapper.width( $(scrollElement).children(":first").width() );
            } else {
                $wrapper.width(scrollElement.scrollWidth);
            }

            this.activeScroll(scrollElement, $bar);
            $base.width($wrapper.outerWidth() + $bar.outerWidth());
        }