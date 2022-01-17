function() {
            var offset = this.container.offset(),
                height = this.container.outerHeight(),
                width  = this.container.outerWidth(),
                css = {
                top: offset.top + height,
                left: offset.left,
                width: width
            };

            this.dropdown.css(css);
        }