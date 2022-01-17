function(owner) {
        PopupMenu.PopupMenuSection.prototype._init.call(this);

        this._owner = owner;
        this._app = "";
        this._status = "";
        // Guess the name based on the dbus path
        // Should be overriden by the Identity property
        this._identity = this._owner.split('.')[3].charAt(0).toUpperCase() + this._owner.split('.')[3].slice(1);
        this._playlists = "";
        this._playlistsMenu = "";
        this._currentPlaylist = "";
        this._currentTime = -1;
        this._timeoutId = 0;
        this._mediaServer = new DBusIface.MediaServer2(owner);
        this._mediaServerPlayer = new DBusIface.MediaServer2Player(owner);
        this._mediaServerPlaylists = new DBusIface.MediaServer2Playlists(owner);
        this._prop = new DBusIface.Properties(owner);
        this._settings = settings;

        this.showVolume = this._settings.get_boolean(MEDIAPLAYER_VOLUME_KEY);
        this.showPosition = this._settings.get_boolean(MEDIAPLAYER_POSITION_KEY);
        this.showPlaylists = this._settings.get_boolean(MEDIAPLAYER_PLAYLISTS_KEY);
        this.coverSize = this._settings.get_int(MEDIAPLAYER_COVER_SIZE);

        let genericIcon = new St.Icon({icon_name: "audio-x-generic", icon_size: 16, icon_type: St.IconType.SYMBOLIC});
        this.playerTitle = new Widget.TitleItem(this._identity, genericIcon, Lang.bind(this, function() { this._mediaServer.QuitRemote(); }));

        this.addMenuItem(this.playerTitle);

        this.trackCoverContainer = new St.Button({style_class: 'track-cover-container', x_align: St.Align.START, y_align: St.Align.START});
        this.trackCoverContainer.connect('clicked', Lang.bind(this, this._toggleCover));
        this.trackCoverFile = false;
        this.trackCover = new St.Icon({icon_name: "media-optical-cd-audio", icon_size: this.coverSize, icon_type: St.IconType.FULLCOLOR});
        this.trackCoverContainer.set_child(this.trackCover);

        this.trackTitle = new Widget.TrackTitle('%s', 'track-title');
        this.trackTitle.format([_('Unknown Title')]);
        this.trackArtist = new Widget.TrackTitle('<span foreground="#ccc">' + _("by") +'</span> %s', 'track-artist');
        this.trackArtist.format([_('Unknown Artist')]);
        this.trackAlbum = new Widget.TrackTitle('<span foreground="#ccc">' + _("from") + '</span> %s', 'track-album');
        this.trackAlbum.format([_('Unknown Album')]);

        this.trackBox = new Widget.TrackBox(this.trackCoverContainer);
        this.trackBox._infos.add(this.trackTitle.label, {row: 0, col: 1, y_expand: false});
        this.trackBox._infos.add(this.trackArtist.label, {row: 1, col: 1, y_expand: false});
        this.trackBox._infos.add(this.trackAlbum.label, {row: 2, col: 1, y_expand: false});

        this.addMenuItem(this.trackBox);

        this.trackBox.box.hide();
        this.trackBox.box.opacity = 0;
        this.trackBox.box.set_height(0);

        this._prevButton = new Widget.ControlButton('media-skip-backward',
            Lang.bind(this, function () { this._mediaServerPlayer.PreviousRemote(); }));
        this._playButton = new Widget.ControlButton('media-playback-start',
            Lang.bind(this, function () { this._mediaServerPlayer.PlayPauseRemote(); }));
        this._stopButton = new Widget.ControlButton('media-playback-stop',
            Lang.bind(this, function () { this._mediaServerPlayer.StopRemote(); }));
        this._stopButton.hide();
        this._nextButton = new Widget.ControlButton('media-skip-forward',
            Lang.bind(this, function () { this._mediaServerPlayer.NextRemote(); }));

        this.trackControls = new Widget.ControlButtons();
        this.trackControls.addButton(this._prevButton.actor);
        this.trackControls.addButton(this._playButton.actor);
        this.trackControls.addButton(this._stopButton.actor);
        this.trackControls.addButton(this._nextButton.actor);

        this.addMenuItem(this.trackControls);

        if (this.showPosition) {
            this._position = new Widget.SliderItem("0:00 / 0:00", "document-open-recent", 0);
            this._position.connect('value-changed', Lang.bind(this, function(item) {
                let time = item._value * this._songLength;
                this._position.setLabel(this._formatTime(time) + " / " + this._formatTime(this._songLength));
                this._mediaServerPlayer.SetPositionRemote(this.trackObj, time * 1000000);
            }));
            this.addMenuItem(this._position);
            this._position.actor.hide();
        }

        if (this.showVolume) {
            this._volume = new Widget.SliderItem(_("Volume"), "audio-volume-high", 0);
            this._volume.connect('value-changed', Lang.bind(this, function(item) {
                this._mediaServerPlayer.Volume = item._value;
            }));
            this.addMenuItem(this._volume);
            this._volume.actor.hide();
        }

        this._getVolume();
        this._getIdentity();
        this._getDesktopEntry();
        this._getMetadata();
        this._getStatus();
        if (this.showPlaylists) {
            this._getPlaylists();
            this._getActivePlaylist();
        }
        this._getPosition();

        if (this._mediaServer.CanRaise) {
            this.playerTitle.connect('activate',
                Lang.bind(this, function () {
                    // If we have an application in the appSystem
                    // Bring it to the front else let the player  decide
                    if (this._app)
                        this._app.activate_full(-1, 0);
                    else
                        this._mediaServer.RaiseRemote();
                    // Close the indicator
                    mediaplayerMenu.menu.close();
                })
            );
        }
        else {
            // Make the player title insensitive
            this.playerTitle.setSensitive(false);
            this.playerTitle.actor.remove_style_pseudo_class('insensitive');
        }

        if (this._mediaServer.CanQuit) {
            this.playerTitle.showButton();
        }

        this._prop.connectSignal('PropertiesChanged', Lang.bind(this, function(proxy, sender, [iface, props]) {
            if (props.Volume)
                this._setVolume(props.Volume.unpack());
            if (props.PlaybackStatus)
                this._setStatus(props.PlaybackStatus.unpack());
            if (props.Metadata)
                this._setMetadata(props.Metadata.deep_unpack());
            if (props.ActivePlaylist)
                this._setActivePlaylist(props.ActivePlaylist.deep_unpack());
        }));

        this._mediaServerPlayer.connectSignal('Seeked', Lang.bind(this, function(proxy, sender, [value]) {
            this._setPosition(value);
        }));
    }