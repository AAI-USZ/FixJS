function(backward, switch_group) {
        let appSys = Shell.AppSystem.get_default();
        let apps = appSys.get_running ();

        if (!apps.length)
            return false;

        if (!Main.pushModal(this.actor))
            return false;
        this._haveModal = true;

        this.actor.connect('key-press-event', Lang.bind(this, this._keyPressEvent));
        this.actor.connect('key-release-event', Lang.bind(this, this._keyReleaseEvent));

        this.actor.connect('button-press-event', Lang.bind(this, this._clickedOutside));
        this.actor.connect('scroll-event', Lang.bind(this, this._onScroll));

        this._appSwitcher = new WindowSwitcher(apps, this);
        this.actor.add_actor(this._appSwitcher.actor);
        this._appSwitcher.connect('item-activated', Lang.bind(this, this._appActivated));
        this._appSwitcher.connect('item-entered', Lang.bind(this, this._appEntered));

        this._appIcons = this._appSwitcher.icons;

        // Make the initial selection
        if (switch_group) {
            if (backward) {
                this._select(0, this._appIcons[0].cachedWindows.length - 1);
            } else {
                if (this._appIcons[0].cachedWindows.length > 1)
                    this._select(0, 1);
                else
                    this._select(0, 0);
            }
        } else if (this._appIcons.length == 1) {
            this._select(0);
        } else if (backward) {
            this._select(this._appIcons.length - 1);
        } else {
            if (this._appIcons.length > 0) {
                this._select(1);
            }
        }

        let [x, y, mods] = global.get_pointer();
        if (!(mods & Gdk.ModifierType.MOD1_MASK)) {
            this._finish();
            return false;
        }

        this.actor.opacity = 0;
        this.actor.show();
        Tweener.addTween(this.actor,
                         { opacity: 255,
                           time: POPUP_FADE_TIME,
                           transition: 'easeOutQuad'
                         });
        return true;
    }