function(text) {
                var response = JSON.parse(text);
                // set the redirect data to view_url of the new revision
                log.debug('Save succeeded');
                if (response.full_name) {
                    this.packageInfoNameEl.set('text', response.full_name);
                    this.options.full_name = response.full_name;
                    this.package_.set('full_name', response.full_name);
                }
                dom.$('revision_message').set('value', '');
                if (response.attachments_changed) {
                    object.forEach(response.attachments_changed,
                        function(options, uid) {
                            if (this.attachments[uid]) {
                                // updating attachment's uid
                                var att = this.attachments[uid];
                                att.set(options);
                            }
                        }, this
                    );
                }
                //fd().setURIRedirect(response.view_url);
                // set data changed by save
                this.registerRevision(response);
                fd().message.alert(response.message_title, response.message);
                // clean data leaving package_info data
                this.data = {};
                this.options.package_info_form_elements.forEach(function(key) {
                    if (response[key] != null) {
                        this.data[key] = response[key];
                    }
                }, this);
                if (fd().editPackageInfoModal) {
                    fd().editPackageInfoModal.destroy();
                }
                if (this.test_el && this.test_el.hasClass('pressed')) {
                    // only one add-on of the same id should be allowed on the Helper side
                    this.installAddon();
                }
                this.editor.cleanChangeState();
                this.emit('save');
            }