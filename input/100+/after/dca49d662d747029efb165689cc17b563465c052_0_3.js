function() {
        this.bookmarks = this.placesManager.getBookmarks();

        for (let bookmarkid = 0; bookmarkid < this.bookmarks.length; bookmarkid++) {
            this.bookmarkItems[bookmarkid] = new PopupMenu.PopupMenuItem(this.bookmarks[bookmarkid].name);
            let icon = this.bookmarks[bookmarkid].iconFactory(PLACE_ICON_SIZE);
            this.bookmarkItems[bookmarkid].addActor(icon, { align: St.Align.END, span: -1 });
            this.bookmarkItems[bookmarkid].place = this.bookmarks[bookmarkid];
            this._bookmarksSection.addMenuItem(this.bookmarkItems[bookmarkid]);
            this.bookmarkItems[bookmarkid].connect('activate', function(actor,event) {
                actor.place.launch();
            });
        }
    }