function() {
        this.$style = $("<style type='text/css' rel='stylesheet' />").appendTo($("head"));
        var rules = [
            ".slick-row { height:" + this.rowHeight + "px; }"
        ];

        if (this.$style[0].styleSheet) { // IE
            this.$style[0].styleSheet.cssText = rules.join(" ");
        } else {
            this.$style[0].appendChild(document.createTextNode(rules.join(" ")));
        }
    }