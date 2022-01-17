function(trash_file, params)
    {
        this.trash_file = trash_file;
        let icon = (this._isTrashEmpty()) ? "trashcan_empty" : "trashcan_full";
        
        MenuItemBase.prototype._init.call(this, icon, _("Trash"), params);

        if (!this._isTrashEmpty()) {
            // Add empty button
            let empty_icon = new St.Icon({ icon_name: 'edit-clear', icon_type: St.IconType.SYMBOLIC, style_class: 'popup-menu-icon' });
            let empty_button = new St.Button({ child: empty_icon, tooltip_text: _("Empty Trash")  });
            empty_button.connect('clicked', Lang.bind(this, this._confirmEmptyTrash));
            this.addActor(empty_button);
        }

        // Hide trash item if trash is empty
        if (settings.get_boolean('hide-empty-trash-item')) {
            if (this._isTrashEmpty()) this.actor.visible = false;
        }
        
        return this;
    }