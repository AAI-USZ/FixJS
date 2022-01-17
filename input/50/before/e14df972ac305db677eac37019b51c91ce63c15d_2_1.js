function(name) {
            this.onHostEvent(name, obj[config['on' + name]] || this.ybindUpdate, obj);
        }