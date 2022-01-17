function() {

            var buttons = new ButtonGroup();
            if(this.state == 'edit') {

                buttons.addButton("Close Editor", {
                    callback: _.bind(function() {
                        contactFormView.saveAction(function() {
                            this.setState('show');
                        }, this);
                    }, this)
                });

            } else {

                buttons.addButton("Edit", {
                    title: "Edit details.",
                    callback: _.bind(function() {
                        this.setState('edit')
                    }, this)
                });
            }

            buttons.addButton("Delete", {
                title: "Delete this contact.",
                callback: _.bind(this.deleteContact, this)
            });

            buttons.addButton("Add Picture", {
                title: "Attach a picture to this contact.",
                callback: _.bind(this.addPictureDialog, this)
            });

            this.div.appendChild(buttons.div);
        }