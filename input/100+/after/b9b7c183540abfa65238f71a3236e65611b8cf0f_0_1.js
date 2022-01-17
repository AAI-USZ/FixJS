function resolveContainerWidth() {
                var style, attrs, matches, i, l;

                if (this.opts.width === "off") {
                    return null;
                } else if (this.opts.width === "element"){
                    return this.opts.element.outerWidth() === 0 ? 'auto' : this.opts.element.outerWidth() + 'px';
                } else if (this.opts.width === "copy" || this.opts.width === "resolve") {
                   if (this.opts.width === "copy") {
                       // get the width as computed by jQuery for the original element
                        var newWidth = this.opts.element.outerWidth();
                        // if the width of the element is bigger than its parent, get the width relative to the screen
                        if(this.opts.element.outerWidth() > this.opts.element.parent().outerWidth()) {
                            newWidth = (this.opts.element.outerWidth() / $(window).outerWidth()) * this.opts.element.parent().outerWidth();
                        }
                        // return it in a pixel value so it is consistent across browsers
                        return newWidth + "px";
                   }

                    if (this.opts.width === "resolve") {
                        // next check if css('width') can resolve a width that is percent based, this is sometimes possible
                        // when attached to input type=hidden or elements hidden via css
                        style = this.opts.element.css('width');
                        if (style.indexOf("%") > 0) return style;

                        // finally, fallback on the calculated width of the element
                        return (this.opts.element.outerWidth() === 0 ? 'auto' : this.opts.element.outerWidth() + 'px');
                    }

                    return null;
                } else {
                    return this.opts.width;
               }
            }