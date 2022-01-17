function() {
        var self = this;
        var colorMenu = Ext.create('Ext.menu.ColorPicker', {
            height: 24,
            handler: function(cm, color){
                Frog.Prefs.set('backgroundColor', color);
            }
        });
        colorMenu.picker.colors = ['000000', '424242', '999999'];
        var tileSizeHandler = function(item, checked) {
            var size = item.value;
            Frog.Prefs.set('tile_count', size);
            item.parentMenu.hide();
            self.fireEvent('onChange', [Frog.Prefs]);
        }
        var batchSize = Ext.create('Ext.form.field.Number', {
            value: Frog.Prefs.batch_size,
            minValue: 0,
            maxValue: 500
        });
        batchSize.on('change', function(field, val) { 
            Frog.Prefs.set('batch_size', val);
            //self.fireEvent('onChange', [self]);
        });

        var menu = Ext.create('Ext.menu.Menu', {
            items: [
                {
                    text: 'Viewer Background',
                    menu: colorMenu
                },
                {
                    text: 'Thumbnail Size',
                    menu: [
                        {
                            text: 'Large (6)',
                            value: 6,
                            checked: Frog.Prefs.tile_count === 6,
                            group: 'theme',
                            checkHandler: tileSizeHandler
                        }, {
                            text: 'Medium (9)',
                            value: 9,
                            checked: Frog.Prefs.tile_count === 9,
                            group: 'theme',
                            checkHandler: tileSizeHandler
                        }, {
                            text: 'Small (12)',
                            value: 12,
                            checked: Frog.Prefs.tile_count === 12,
                            group: 'theme',
                            checkHandler: tileSizeHandler
                        }
                    ]
                },
                {
                    text: 'Item Request Size',
                    menu: [
                        batchSize
                    ]
                }, {
                    xtype: 'menucheckitem',
                    text: 'Include Images',
                    checked: Frog.Prefs.include_image,
                    checkHandler: function(item, checked) {
                        Frog.Prefs.set('include_image', checked);
                        item.parentMenu.hide();
                        self.fireEvent('onChange', [Frog.Prefs]);
                    }
                }, {
                    xtype: 'menucheckitem',
                    text: 'Incude Video',
                    checked: Frog.Prefs.include_video,
                    checkHandler: function(item, checked) {
                        Frog.Prefs.set('include_video', checked);
                        item.parentMenu.hide();
                        self.fireEvent('onChange', [Frog.Prefs]);
                    }
                }
                
            ]
        });

        return menu;
    }