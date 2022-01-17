function(entry) {
            this.entry = this.convertEntry(entry || {});
            
            domClass.remove(this.domNode, 'panel-loading');
        }