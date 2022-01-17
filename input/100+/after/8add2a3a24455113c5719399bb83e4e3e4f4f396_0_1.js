function() {
        // collect data from the Modal
        this.options.package_info_form_elements.forEach(function(key) {
            var el = dom.$(key);
            if (el) {
                this.data[key] = el.get('value');
            }
        }, this);
        if (this.options.jid === this.data.jid) {
          delete this.data.jid;
        }
        // check if save should be called
        if (this.savenow) {
            return this.save();
        }
        fd().editPackageInfoModal.destroy();
    }