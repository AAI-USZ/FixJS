function(lookingGlass) {
        let container = new Shell.GenericContainer({ width: 0,
                                                     height: 0 });
        container.connect('allocate', Lang.bind(this, this._allocate));
        Main.uiGroup.add_actor(container);

        let eventHandler = new St.BoxLayout({ name: 'LookingGlassDialog',
                                              vertical: false,
                                              reactive: true });
        this._eventHandler = eventHandler;
        container.add_actor(eventHandler);
        this._displayText = new St.Label();
        eventHandler.add(this._displayText, { expand: true });

        eventHandler.connect('key-press-event', Lang.bind(this, this._onKeyPressEvent));
        eventHandler.connect('button-press-event', Lang.bind(this, this._onButtonPressEvent));
        eventHandler.connect('scroll-event', Lang.bind(this, this._onScrollEvent));
        eventHandler.connect('motion-event', Lang.bind(this, this._onMotionEvent));
        Clutter.grab_pointer(eventHandler);
        Clutter.grab_keyboard(eventHandler);

        // this._target is the actor currently shown by the inspector.
        // this._pointerTarget is the actor directly under the pointer.
        // Normally these are the same, but if you use the scroll wheel
        // to drill down, they'll diverge until you either scroll back
        // out, or move the pointer outside of _pointerTarget.
        this._target = null;
        this._pointerTarget = null;

        this._lookingGlass = lookingGlass;
    }