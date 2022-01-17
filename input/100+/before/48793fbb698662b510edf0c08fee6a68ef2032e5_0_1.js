function() {
            var self = this;

            this.model.set({
                name: $('#name').val(),
                grapes: $('#grapes').val(),
                country: $('#country').val(),
                region: $('#region').val(),
                year: $('#year').val(),
                description: $('#description').val()
            });
            if (this.model.isNew()) {
                app.wineList.create(this.model, {
                    success: function() {
                        self.sendStatus('success', 'saved');
                        app.navigate('wines/' + self.model.id , true);
                    }
                });
            } else {

                this.model.save({
                    // Strange error: If you call save on a model that has no changes,
                    // then this success handler will not be called.
                    success: function() {
                        self.sendStatus('success', 'saved');
                    }
                });

            }

            return false;
        }