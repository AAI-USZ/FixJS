function() {
                    var grid = Engine.getComponent(Ext.ux.CardGrid,'Ext.ux.CardGrid')
                    if (grid.store && grid.rendered) {
                        grid.store.load()
                    }
                    Ext.getCmp('tab-panel').toolbars[0].add(grid);
                    Ext.getCmp('tab-panel').toolbars[0].add(grid);
                    Ext.getCmp('tab-panel').toolbars[0].doLayout();
                }