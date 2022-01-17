function () {
            var style, attrs, matches, i, l;
            if (this.opts.width !== undefined)
                return this.opts.width;

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
            return (this.opts.element.width() === 0 ? 'auto' : this.opts.element.width() + 'px');
        }