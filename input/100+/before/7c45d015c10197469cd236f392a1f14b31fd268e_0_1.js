function CodeHintList() {
        // TODO Ty: should pass array of objects instead of strings as source so richer data can
        // be passed to hint list
        this.source = _getCodeHints(HTMLTags);
        this.query = "";
        this.displayList = [];
        this.options = {
            maxResults: 8
        };

        this.opened = false;
        this.selectedIndex = -1;
        this.editor = null;

        // TODO Randy: remove context-menu class
        // how much class sharing should ContextMenus and CodeHints have?
        this.$hintMenu = $("<li class='dropdown context-menu'></li>");

        var $toggle = $("<a href='#' class='dropdown-toggle'></a>")
            .hide();

        this.$hintMenu.append($toggle)
            .append("<ul class='dropdown-menu'></ul>");

        $("#codehint-menu-bar > ul").append(this.$hintMenu);

    }