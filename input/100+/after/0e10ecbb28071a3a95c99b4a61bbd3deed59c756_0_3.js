function(el, id) {
        var self = this;
        this.id = id;
        Ext.require(['*']);

        // -- Models
        Ext.define('Gallery', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id'},
                {name: 'title'},
                {name: 'image_count', type: 'int'},
                {name: 'video_count', type: 'int'},
                {name: 'owner'},
                {name: 'description'}
            ]
        });

        this.galleryStore = Ext.create('Ext.data.Store', {
            autoLoad: true,
            autoSync: true,
            model: 'Gallery',
            proxy: {
                type: 'ajax',
                url: '/frog/gallery',
                reader: {
                    type: 'json',
                    root: 'values'
                }
            }
        });

        this.toolbar = Ext.create('Ext.toolbar.Toolbar');
        this.toolbar.render(el);
        var navMenu = Ext.create('Ext.menu.Menu');
        this.bNav = this.toolbar.add({
            text: 'Navigation',
            icon: FrogStaticRoot + '/frog/i/compass.png',
            menu: navMenu
        });
        navMenu.add(this.getNavMenu());
        this.bUpload = this.toolbar.add({
            id: 'frogBrowseButton',
            text: 'Upload',
            icon: FrogStaticRoot + '/frog/i/add.png'
        });
        this.bEditTags = this.toolbar.add({
            text: 'Edit Tags',
            icon: FrogStaticRoot + '/frog/i/tag_orange.png',
            handler: function() {
                var guids = [];
                $$('.selected').each(function(item) {
                    guids.push(item.dataset.frog_guid);
                });
                var win = Ext.create('widget.window', {
                    title: 'Edit Tags',
                    icon: FrogStaticRoot + '/frog/i/tag_orange.png',
                    closable: true,
                    resizable: false,
                    modal: true,
                    width: 800,
                    height: 600,
                    layout: 'fit',
                    bodyStyle: 'padding: 5px;',
                    items: [{
                        loader: {
                            url: '/frog/tag/manage?guids=' + guids.join(','),
                            contentType: 'html',
                            loadMask: true,
                            autoLoad: true,
                            scripts: true,
                            cache: false
                        }
                    }],
                    buttons: [{
                        text: 'Save',
                        handler: function() {
                            var add = [], rem = [];
                            $$('#frog_add li').each(function(item) {
                                var id = item.dataset.frog_tag_id;
                                add.push(id);
                            });
                            $$('#frog_rem li').each(function(item) {
                                var id = item.dataset.frog_tag_id;
                                rem.push(id);
                            });
                            
                            new Request.JSON({
                                url: '/frog/tag/manage',
                                headers: {"X-CSRFToken": Cookie.read('csrftoken')},
                                onSuccess: function() {
                                    add.each(function(tag) {
                                        Frog.Tags.get(tag);
                                    });
                                }
                            }).POST({
                                add: add.join(','),
                                rem: rem.join(','),
                                guids: guids.join(',')
                            });
                            win.close();
                        }
                    },{
                        text: 'Cancel',
                        handler: function() {
                            win.close();
                        }
                    }]
                });
                win.show();
            }
        });
        this.mRemove = Ext.create('Ext.menu.Item', {
            text: 'Remove Selected',
            icon: FrogStaticRoot + '/frog/i/cross.png',
            handler: function() {
                var ids = [];
                $$('.selected').each(function(item) {
                    ids.push(item.dataset.frog_tn_id.toInt());
                });
                self.fireEvent('onRemove', [ids])
            }
        });
        this.mCopy = Ext.create('Ext.menu.Item', {
            text: 'Copy to Gallery',
            icon: FrogStaticRoot + '/frog/i/page_white_copy.png',
            handler: function() {
                var win = Ext.create('widget.window', {
                    title: 'Copy to Gallery',
                    icon: FrogStaticRoot + '/frog/i/page_white_copy.png',
                    closable: true,
                    closeAction: 'hide',
                    resizable: false,
                    modal: true,
                    width: 600,
                    height: 300,
                    bodyStyle: 'padding: 5px;'
                });
                win.show();

                var fp = Ext.create('Ext.FormPanel', {
                    items: [{
                        xtype: 'label',
                        text: "Copy images to a new Gallery:"
                    }, {
                        xtype:'fieldset',
                        title: 'New Gallery',
                        items: [
                            {
                                fieldLabel: 'Title',
                                xtype: 'textfield',
                                name: 'title'

                            }, {
                                fieldLabel: 'Description',
                                xtype: 'textfield',
                                name: 'description'
                            }
                        ]
                    }, {
                        xtype: 'label',
                        text: 'Or choose an existing one:'
                    }, {
                        xtype:'fieldset',
                        title: 'Existing Gallery',
                        items: [
                            {
                                xtype: 'combobox',
                                editable: false,
                                store: self.galleryStore,
                                displayField: 'title',
                                valueField: 'id',
                                id: 'frog_gallery_id'
                            }
                        ]
                    }],
                    buttons: [{
                        text: 'Send',
                        handler: function() {
                            var data = fp.getForm().getValues();
                            data.id = data['frog_gallery_id-inputEl'];
                            if (data.title !== "") {
                                new Request.JSON({
                                    url: '/frog/gallery',
                                    async: false,
                                    onSuccess: function(res) {
                                        data.id = res.value.id;
                                    }
                                }).POST({title: data.title, description: data.description});
                            }
                            var selected = $$('.thumbnail.selected');
                            guids = [];
                            selected.each(function(item) {
                                guids.push(item.dataset.frog_guid);
                            });
                            new Request.JSON({
                                url: '/frog/gallery/' + data.id,
                                emulation: false,
                                async: false,
                                onSuccess: function(res) {
                                    self.galleryStore.sync();
                                    Ext.MessageBox.confirm('Confirm', 'Would you like to visit this gallery now?', function(res) {
                                        if (res === 'yes') {
                                            window.location = '/frog/gallery/' + data.id;
                                        }
                                    });
                                }
                            }).PUT({guids: guids.join(',')});
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
            }
        });
        this.mDownload = Ext.create('Ext.menu.Item', {
            text: 'Download Sources',
            icon: FrogStaticRoot + '/frog/i/compress.png',
            handler: function() {
                var selected = $$('.thumbnail.selected');
                guids = [];
                selected.each(function(item) {
                    guids.push(item.dataset.frog_guid);
                });
                location.href = '/frog/download?guids=' + guids.join(',');
            }
        });
        this.mSwitchArtist = Ext.create('Ext.menu.Item', {
            text: 'Switch Artist',
            icon: FrogStaticRoot + '/frog/i/user_edit.png',
            handler: function() {
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
        });
        
        var m = Ext.create('Ext.menu.Menu', {
            items: [this.mRemove, this.mCopy, this.mDownload, '-', this.mSwitchArtist]
        });
        
        this.toolbar.add({
            text: 'Manage',
            icon: FrogStaticRoot + '/frog/i/photos.png',
            menu: m
        });
        this.toolbar.add('-')
        this.bRSS = this.toolbar.add({
            icon: FrogStaticRoot + '/frog/i/feed.png',
            handler: function() {
                var win = Ext.create('widget.window', {
                    title: 'RSS Feeds',
                    icon: FrogStaticRoot + '/frog/i/feed.png',
                    closable: true,
                    closeAction: 'hide',
                    resizable: false,
                    modal: true,
                    width: 400,
                    height: 200,
                    bodyStyle: 'padding: 5px;'
                });
                win.show();
                var fp = Ext.create('Ext.FormPanel', {
                    defaultType: 'radio',
                    items: [{
                        xtype: 'label',
                        text: "Select a feed frequency you'd like to subscribe to and the images will be available through Outlook"
                    },
                    {
                        boxLabel: 'Daily',
                        name: 'rss_int',
                        inputValue: 'daily'
                    }, {
                        checked: true,
                        boxLabel: 'Weekly',
                        name: 'rss_int',
                        inputValue: 'weekly'
                    }],
                    buttons: [{
                        text: 'Save',
                        handler: function() {
                            var r = fp.getForm().getValues(true).split('=')[1];
                            location.href = 'feed://' + location.host + '/frog/rss/' + self.id + '/' + r;
                            win.close();
                        }
                    },{
                        text: 'Cancel',
                        handler: function() {
                            win.close();
                        }
                    }]
                });
                win.add(fp)
            }
        });
        this.bHelp = this.toolbar.add({
            icon: FrogStaticRoot + '/frog/i/help.png',
            handler: function() {
                var win = Ext.create('widget.window', {
                    title: 'Ask for Help',
                    icon: FrogStaticRoot + '/frog/i/help.png',
                    closable: true,
                    closeAction: 'hide',
                    resizable: false,
                    modal: true,
                    width: 400,
                    bodyPadding: 10,
                    bodyStyle: 'padding: 5px; background: transparent;'
                });
                win.show();
                var fp = Ext.create('Ext.FormPanel', {
                    items: [{
                        xtype: 'label',
                        text: "Have a question, problem or suggestion?"
                    },
                    {
                        xtype     : 'textareafield',
                        grow      : true,
                        name      : 'message',
                        anchor    : '100%'
                    }],
                    buttons: [{
                        text: 'Send',
                        handler: function() {
                            var data = fp.getForm().getValues();
                            new Request({
                                url: '/frog/help/',
                                headers: {"X-CSRFToken": Cookie.read('csrftoken')}
                            }).POST(data);
                            win.close();
                        }
                    },{
                        text: 'Cancel',
                        handler: function() {
                            win.close();
                        }
                    }]
                });
                win.add(fp)
            }
        });
        var prefMenu = this.getPrefMenu();
        this.bPreferences = this.toolbar.add({
            icon: FrogStaticRoot + '/frog/i/cog.png',
            menu: prefMenu
        });
    }