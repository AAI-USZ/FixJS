function addMenu(name, id, position, relativeID) {
        name = StringUtils.htmlEscape(name);
        var $menubar = $("#main-toolbar .nav"),
            menu;

        if (!name || !id) {
            throw new Error("call to addMenu() is missing required parameters");
        }
        
        // Guard against duplicate menu ids
        if (menuMap[id]) {
            console.log("Menu added with same name and id of existing Menu: " + id);
            return null;
        }

        menu = new Menu(id);
        menuMap[id] = menu;

        var $toggle = $("<a href='#' class='dropdown-toggle'>" + name + "</a>"),
            $popUp = $("<ul class='dropdown-menu'></ul>"),
            $newMenu = $("<li class='dropdown' id='" + id + "'></li>").append($toggle).append($popUp);

        // Insert menu
        var $relativeElement = relativeID && $(_getHTMLMenu(relativeID));
        _insertInList($menubar, $newMenu, position, $relativeElement);
        
        // Install ESC key handling
        PopUpManager.configurePopUp($popUp, closeAll);

        // todo error handling

        return menu;
    }