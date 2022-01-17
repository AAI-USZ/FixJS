function(device, icon, text, params)
    {
        this.device = device;

        MenuItemBase.prototype._init.call(this, icon, text, params);
        
        // Add eject button
        let eject_icon = new St.Icon({ icon_name: 'media-eject', icon_type: St.IconType.SYMBOLIC, style_class: 'popup-menu-icon' });
        let eject_button = new St.Button({ child: eject_icon });
        eject_button.connect('clicked', Lang.bind(this, this._confirmEjectDevice));
        this.addActor(eject_button);
        
        return this;
    }