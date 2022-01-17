function(start, count) {
        for (let k = start; k < start + count; k++) {
            let metaWorkspace = global.screen.get_workspace_by_index(k);
            let thumbnail = new ExpoWorkspaceThumbnail(metaWorkspace);
            thumbnail.setPorthole(this._porthole.x, this._porthole.y,
                                  this._porthole.width, this._porthole.height);
            this._thumbnails.push(thumbnail);
            if (metaWorkspace == global.screen.get_active_workspace())
                this._lastActiveWorkspace = thumbnail;
            this.actor.add_actor(thumbnail.actor);
            this.actor.add_actor(thumbnail.title);

            thumbnail.connect('drag-over', Lang.bind(this, function () { thumbnail._highlight(); if (this.lastHovered && this.lastHovered != thumbnail) this.lastHovered._shade(); this.lastHovered = thumbnail;}));

            thumbnail.actor.connect('enter-event', Lang.bind(this, function (actor, event) { this.lastHovered = thumbnail; this.showButton(); thumbnail._onEnterEvent(actor, event)}));
            thumbnail.actor.connect('leave-event', Lang.bind(this, function () { this.button.hide(); if (thumbnail.metaWorkspace != global.screen.get_active_workspace()) thumbnail._shade(); thumbnail.hovered = false; thumbnail._overviewModeOff();}));
            thumbnail.connect('remove-event', Lang.bind(this, function () { this.button.hide(); if (thumbnail.metaWorkspace != global.screen.get_active_workspace()) thumbnail._shade(); thumbnail.hovered = false; thumbnail._overviewModeOff();}));

            Main.expo.connect('hiding', Lang.bind(this, function() { this.button.hide();}));

            if (start > 0) { // not the initial fill
                thumbnail.state = ThumbnailState.NEW;
                thumbnail.slidePosition = 1; // start slid out
                this._haveNewThumbnails = true;
            } else {
                thumbnail.state = ThumbnailState.NORMAL;
            }

            this._stateCounts[thumbnail.state]++;
        }

        this._queueUpdateStates();
    }