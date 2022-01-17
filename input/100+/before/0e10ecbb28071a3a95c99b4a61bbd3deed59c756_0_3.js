function() {
                var win = Ext.create('widget.window', {
                    title: 'Switch Artist',
                    closable: true,
                    closeAction: 'hide',
                    resizable: false,
                    modal: true,
                    width: 400,
                    height: 200,
                    bodyStyle: 'padding: 5px;'
                });
                win.show();
                var input = new Element('input', {placeholder: "Search"});

                var fp = Ext.create('Ext.FormPanel', {
                    items: [{
                        xtype: 'label',
                        text: "Start typing the name of an artist or if this is a new artist, type in the first and last name and click Send"
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Artist Name',
                        id: 'frog_switch_artist'
                    }],
                    buttons: [{
                        text: 'Send',
                        handler: function() {
                            self.switchArtistCallback(input.value);
                            win.close();
                        }
                    },{
                        text: 'Cancel',
                        handler: function() {
                            win.close();
                        }
                    }]
                });
                win.add(fp);
                var input = $('frog_switch_artist-inputEl');
                new Meio.Autocomplete(input, '/frog/artistlookup', {
                    requestOptions: {
                        headers: {"X-CSRFToken": Cookie.read('csrftoken')},
                    },
                    filter: {
                        path: 'name',
                        formatItem: function(text, data) {
                            if (data.id === 0) {
                                return '<span class="search"></span>' + data.name
                            }
                            else {
                                return '<span></span>' + data.name
                            }
                        }
                    }
                });
                input.focus();
            }