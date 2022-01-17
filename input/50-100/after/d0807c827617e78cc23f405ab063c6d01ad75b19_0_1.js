function(lookingGlass) {
        this._obj = null;
        this._previousObj = null;

        this._parentList = [];

        this.actor = new St.ScrollView({ x_fill: true, y_fill: true });
        this.actor.get_hscroll_bar().hide();
        this._container = new St.BoxLayout({ name: 'LookingGlassPropertyInspector',
                                             style_class: 'lg-dialog',
                                             vertical: true });
        this.actor.add_actor(this._container);

        this._lookingGlass = lookingGlass;
    }