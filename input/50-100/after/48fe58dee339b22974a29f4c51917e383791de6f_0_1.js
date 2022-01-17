function () {
            var placeholder = this.getPlaceholder();

            if (placeholder !== undefined  && this.getVal().length === 0 && this.search.hasClass("select2-focused") === false) {
                this.search.val(placeholder).addClass("select2-default");
                // stretch the search box to full width of the container so as much of the placeholder is visible as possible
                this.search.width("auto");
            } else {
                // we set this to " " instead of "" and later clear it on focus() because there is a firefox bug
                // that does not properly render the caret when the field starts out blank
                this.search.val(" ").width(10);
            }
        }