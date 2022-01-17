function() {
            var offset = this.container.offset(),
                height = this.container.outerHeight(),
                width = this.container.outerWidth(),
                dropHeight = this.dropdown.outerHeight(),
                viewportBottom = document.body.scrollTop + document.documentElement.clientHeight,
                dropTop = offset.top + height,
                enoughRoomBelow = dropTop + dropHeight <= viewportBottom,
                enoughRoomAbove = (offset.top - dropHeight) >= document.body.scrollTop,
                aboveNow = this.dropdown.hasClass("select2-drop-above"),
                above,
                css;

            // always prefer the current above/below alignment, unless there is not enough room

            if (aboveNow) {
                above = true;
                if (!enoughRoomAbove && enoughRoomBelow) above = false;
            } else {
                above = false;
                if (!enoughRoomBelow && enoughRoomAbove) above = true;
            }

            if (above) {
                dropTop = offset.top - dropHeight;
                this.container.addClass("select2-drop-above");
                this.dropdown.addClass("select2-drop-above");
            }
            else {
                this.container.removeClass("select2-drop-above");
                this.dropdown.removeClass("select2-drop-above");
            }

            css = {
                top:dropTop,
                left:offset.left,
                width:width
            };

            this.dropdown.css(css);
        }