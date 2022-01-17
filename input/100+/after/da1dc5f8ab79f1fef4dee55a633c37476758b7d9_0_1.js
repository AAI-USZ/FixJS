function(grid) {
        var me = this,
            headerCt = (grid.ownerCt && grid.ownerCt.lockedGrid) ? grid.ownerCt.lockedGrid.headerCt : grid.headerCt,
            dragZone = headerCt.reorderer.dragZone;

        /**
         * stops here if the toolbar is never rendered!
         * @todo addDocked add toolbar to grid
         */
        if (!me.rendered)
            return false;

        me.droppable.addDDGroup(dragZone.ddGroup);

        dragZone.self.override(
            {
                onStartDrag: function() {
                    if (me.autoHide && me.isHidden()) {
                        me.show(null, function() {
                            Ext.dd.DragDropManager.refreshCache(dragZone.groups);
                        }, me);
                    }
                },
                onEndDrag: function() {
                    if (me.autoHide && me.getSorters().length == 0) {
                        me.hide();
                    }
                }

            });

        me.doSort();
    }