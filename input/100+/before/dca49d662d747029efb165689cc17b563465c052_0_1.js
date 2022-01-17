function() {
        this.parent('folder');

        this.defaultItems = [];
        this.bookmarkItems = [];
        this.deviceItems = [];
        this._createDefaultPlaces();
        this._bookmarksSection = new PopupMenu.PopupMenuSection();
        this.menu.addMenuItem(this._bookmarksSection);
        this._createBookmarks();
        this._devicesMenuItem = new PopupMenu.PopupSubMenuMenuItem(_("Removable Devices"));
        this.menu.addMenuItem(this._devicesMenuItem);
        this._createDevices();

        this._bookmarksId = Main.placesManager.connect('bookmarks-updated',Lang.bind(this,this._redisplayBookmarks));
        this._mountsId = Main.placesManager.connect('mounts-updated',Lang.bind(this,this._redisplayDevices));
    }