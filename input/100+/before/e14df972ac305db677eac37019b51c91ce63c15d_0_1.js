function(config) {
        var obj = config.ybind || this.get('host').getAttribute('ybind'),
            events = [];

        obj = obj ? Y.one(obj).tag : this;

        Y.each(config, function(dummy, name) {
            if (name.indexOf('on') === 0) {
                events.push(name.substr(2));
            }
        });

        if (this === obj) {
            this.addAttr('value', {getter: function() {
                return this.get('host').get('value');
            }});
        }

        Y.Array.each(events, function(name) {
            this.onHostEvent(name, obj[config['on' + name]] || this.ybindUpdate, obj);
        }, this);

        if (config.ref) {
            obj.on(config.ref + 'Change', this.ybindChange, this);
            this.get('host').setHTML(obj.get(config.ref));
        }
    }