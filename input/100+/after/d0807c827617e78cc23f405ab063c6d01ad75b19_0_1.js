function(lookingGlass, o, title) {
        let text;
        if (title)
            text = title;
        else
            text = objectToString(o);
        text = GLib.markup_escape_text(text, -1);
        this._obj = o;

        this.actor = new St.Button({ reactive: true,
                                     track_hover: true,
                                     style_class: 'shell-link',
                                     label: text });
        this.actor.get_child().single_line_mode = true;
        this.actor.connect('clicked', Lang.bind(this, this._onClicked));

        this._lookingGlass = lookingGlass;
    }