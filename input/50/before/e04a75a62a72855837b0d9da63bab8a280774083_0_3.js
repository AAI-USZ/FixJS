function() {
            this.core.deletePassword('AccessKey:' + key.id)
            me.refresh();
        }