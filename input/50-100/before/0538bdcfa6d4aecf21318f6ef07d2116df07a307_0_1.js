function() {
            var offset = this.container.offset();
            var height = this.container.outerHeight();
            var width  = this.container.outerWidth();
            var css    = {
                top: offset.top + height,
                left: offset.left,
                width: width
            }
            this.dropdown.css(css);
        }