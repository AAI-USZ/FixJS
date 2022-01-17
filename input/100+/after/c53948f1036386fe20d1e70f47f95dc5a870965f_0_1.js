function()
    {
        this.parent(St.Align.START);
        
        // Load default setting
        this._showText  = true;
        this._firstTime = true;
        this._charLimit = 5;
        this._position   = POSITION.CENTER;
        
        // Load setting
        this._settings = DBFMUtil.getSettings();
        this._settingSiganlID = this._settings.connect('changed', Lang.bind(this, this._onSettingsChanged));
        
        //connect to dbus
        this._player = new DBusInterface.DoubanFMServer();
        this._player.connect('state-changed',Lang.bind(this,this._onStateChanged));
        this._player.connect('closed',Lang.bind(this,this._onDBFMDestroy));
        
        //UI START
        
        let prefWidth = this._showText?PANEL_HEIGHT*this._charLimit:0; //Fix length for good UE
        this.actor.set_width(prefWidth+PANEL_HEIGHT); // include the icon
        
        this._box = new St.BoxLayout({ vertical: false,
                                        style_class: "doubanFM"
                                     });
        this.actor.add_actor(this._box);
        
        //icon stuff
        let iconTheme = Gtk.IconTheme.get_default();
        
        if (!iconTheme.has_icon(ICON.NONE))
            iconTheme.append_search_path (Extension.dir.get_path()+'/icons');
        
        this._icon = new St.Icon({ icon_type: St.IconType.SYMBOLIC,
                                    style_class: 'popup-menu-icon',
                                    icon_name: ICON.NONE,
                                    icon_size: Math.round(PANEL_HEIGHT/2)
                                    });
        
        this._box.add_actor(this._icon);
        
        //label
        this._label = new St.Label({ text:'Initializing...',
                                      style_class: 'doubanFM-label'
                                     });
        
        this._box.add_actor(this._label);
        
        //UI END
        
        this.connect('destroy', Lang.bind(this, this._onDestroy));
        
        this._onSettingsChanged();
        this._updateLabel();
    }