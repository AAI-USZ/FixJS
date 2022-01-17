function(obj, skipPrevious) {
        if (!skipPrevious)
            this._previousObj = this._obj;
        else
            this._previousObj = null;
        this._obj = obj;

        this._container.destroy_all_children();

        let hbox = new St.BoxLayout({ style_class: 'lg-obj-inspector-title' });
        this._container.add_actor(hbox);
        let label = new St.Label({ text: 'Inspecting: %s: %s'.format(typeof(obj),
                                                                     objectToString(obj)) });
        label.single_line_mode = true;
        hbox.add(label, { expand: true, y_fill: false });
        let button = new St.Button({ label: 'Insert', style_class: 'lg-obj-inspector-button' });
        button.connect('clicked', Lang.bind(this, this._onInsert));
        hbox.add(button);

        if (this._previousObj != null) {
            button = new St.Button({ label: 'Back', style_class: 'lg-obj-inspector-button' });
            button.connect('clicked', Lang.bind(this, this._onBack));
            hbox.add(button);
        }

        button = new St.Button({ style_class: 'window-close' });
        button.connect('clicked', Lang.bind(this, this.close));
        hbox.add(button);
        if (typeof(obj) == typeof({})) {
            let properties = [];
            for (let propName in obj) {
                properties.push(propName);
            }
            properties.sort();

            for (let i = 0; i < properties.length; i++) {
                let propName = properties[i];
                let valueStr;
                let link;
                try {
                    let prop = obj[propName];
                    link = new ObjLink(this._lookingGlass, prop).actor;
                } catch (e) {
                    link = new St.Label({ text: '<error>' });
                }
                let hbox = new St.BoxLayout();
                let propText = propName + ': ' + valueStr;
                hbox.add(new St.Label({ text: propName + ': ' }));
                hbox.add(link);
                this._container.add_actor(hbox);
            }
        }
    }