function(entry) {
            this.entry = this.convertEntry(entry || {});
            this.setValues(this.entry, true);

            domClass.remove(this.domNode, 'panel-loading');
        }