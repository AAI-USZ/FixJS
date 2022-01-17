function() {
        window.ShoutboxMessages = this.getMessagesStore();
        this.control({
            'textfield': {
                specialkey: function(field, e) {
                    if(e.getKey() == e.ENTER) {
                        var form = field.up('form').getForm();
                        if (form.isValid() && field.getValue()) {
                            // get a store instance and add the message to it
                            $.post('draft/send_message', {
                                message: field.getValue()
                            });

                            field.reset();
                        }
                    } 
                }
            }
        });
        JUG.bind('shoutbox:message', Ext.Function.bind(this.onMessageReceived, this));
        this.getMessagesStore().addListener('datachanged', this.onStoreUpdate, this);
    }