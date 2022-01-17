function() {
        this._itemList.destroy_all_children();
        this._activeSessionId = null;
        this._items = {};

        let ids = GdmGreeter.get_session_ids();
        ids.sort();

        if (ids.length <= 1) {
            this._box.hide();
            this._button.hide();
        } else {
            this._button.show();
            this._box.show();
        }

        for (let i = 0; i < ids.length; i++) {
            let [sessionName, sessionDescription] = GdmGreeter.get_session_name_and_description(ids[i]);

            let item = new SessionListItem(ids[i], sessionName);
            this._itemList.add_actor(item.actor,
                              { x_align: St.Align.START,
                                y_align: St.Align.START,
                                x_fill: true,
                                y_fill: true });
            this._items[ids[i]] = item;

            if (!this._activeSessionId)
                this.setActiveSession(ids[i]);

            item.connect('activate',
                         Lang.bind(this, function() {
                             this.setActiveSession(item.id);
                         }));
        }
    }