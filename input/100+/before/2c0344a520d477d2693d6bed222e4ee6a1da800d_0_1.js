function () {
            var style, attrs, matches, i, l;

            // see if there is width specified in opts
            if (this.opts.width !== undefined)
                return this.opts.width;

            // next check if there is inline style on the element that contains width
            style = this.opts.element.attr('style');
            if (style !== undefined) {
                attrs = style.split(';');
                for (i = 0, l = attrs.length; i < l; i = i + 1) {
                    matches = attrs[i].replace(/\s/g, '')
                        .match(/width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/);
                    if (matches !== null && matches.length >= 1)
                        return matches[1];
                }
            }

            // next check if css('width') can resolve a width that is percent based, this is sometimes possible
            // when attached to input type=hidden or elements hidden via css
            style = this.opts.element.css('width');
            if (style.indexOf("%") > 0) return style;

            // finally, fallback on the calculated width of the element
            return (this.opts.element.width() === 0 ? 'auto' : this.opts.element.width() + 'px');
        }