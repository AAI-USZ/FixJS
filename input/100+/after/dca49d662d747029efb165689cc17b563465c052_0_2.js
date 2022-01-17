function() {
        this.defaultPlaces = this.placesManager.getDefaultPlaces();

        for (let placeid = 0; placeid < this.defaultPlaces.length; placeid++) {
            this.defaultItems[placeid] = new PopupMenu.PopupMenuItem(this.defaultPlaces[placeid].name);
            let icon = this.defaultPlaces[placeid].iconFactory(PLACE_ICON_SIZE);
            this.defaultItems[placeid].addActor(icon, { align: St.Align.END, span: -1 });
            this.defaultItems[placeid].place = this.defaultPlaces[placeid];
            this.menu.addMenuItem(this.defaultItems[placeid]);
            this.defaultItems[placeid].connect('activate', function(actor,event) {
                actor.place.launch();
            });

        }
    }