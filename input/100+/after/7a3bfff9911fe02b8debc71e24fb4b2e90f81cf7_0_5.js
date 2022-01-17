function(callback, studentId) {
        // note: user has to be logged in before this function is called

        this.classStore = Ext.getStore('Classes'),
        this.timeStore = Ext.getStore('Timings'),
        this.role = Ext.getStore('User').first().get('role');

        // clears any previous existing models
        this.classStore.removeAll();
        this.timeStore.removeAll();

        if (this.role == 'student') {
            this.registeredSectionStore = Ext.getStore('RegisteredSections');
            this.registeredClassStore = Ext.getStore('RegisteredClasses');
            this.registeredTimeStore = Ext.getStore('RegisteredTimings');

            this.registeredSectionStore.removeAll();
            this.registeredClassStore.removeAll();
            this.registeredTimeStore.removeAll();

            // retrieves the registered classes
            this.registeredSectionStore.setProxy({
                type: 'ajax',
                url: this.getRegisteredClassesUrl()
            });

            this.registeredSectionStore.load({
                callback: function(records, operation, success) {
                    if (success) {
                        this.sectionIds = this.getRegisteredSectionIds(this.registeredSectionStore, 'section_id');
                        this.fetchCatalog(callback);
                    } else {
                        callback({ 'message': 'Failed to fetch registered classes' });
                    }
                },
                scope: this
            });
        } else if (this.role == 'onsite') {
        }
    }