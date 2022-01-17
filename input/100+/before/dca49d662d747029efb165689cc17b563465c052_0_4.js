function() {
        this.devices = Main.placesManager.getMounts();

        for (let devid = 0; devid < this.devices.length; devid++) {
            this.deviceItems[devid] = new PopupMenu.PopupMenuItem(this.devices[devid].name);
            let icon = this.devices[devid].iconFactory(PLACE_ICON_SIZE);
            this.deviceItems[devid].addActor(icon, { align: St.Align.END, span: -1 });
            this.deviceItems[devid].place = this.devices[devid];
            this._devicesMenuItem.menu.addMenuItem(this.deviceItems[devid]);
            this.deviceItems[devid].connect('activate', function(actor,event) {
                actor.place.launch();
            });
        }

        if (this.devices.length == 0)
            this._devicesMenuItem.actor.hide();
        else
            this._devicesMenuItem.actor.show();
    }