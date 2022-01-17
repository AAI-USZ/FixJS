function ContextMenu(id) {
        this.id = id;
        this.menu = new Menu(id);

        var $newMenu = $("<li class='dropdown context-menu' id='" + StringUtils.jQueryIdEscape(id) + "'></li>"),
            $popUp = $("<ul class='dropdown-menu'></ul>"),
            $toggle = $("<a href='#' class='dropdown-toggle'></a>").hide();

        // assemble the menu fragments
        $newMenu.append($toggle).append($popUp);

        // insert into DOM
        $("#context-menu-bar > ul").append($newMenu);
        
        var self = this;
        PopUpManager.addPopUp($popUp,
            function () {
                self.close();
            },
            false);
    }