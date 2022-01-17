function()
        {
            grid = core.grids.meterGrid;
            selectedIndex = grid.focus.rowIndex;
            selectedItem = grid.getItem(selectedIndex);
            id = grid.store.getValue(selectedItem, 'meter_idMeter');
            tabTitle = grid.store.getValue(selectedItem, 'meter_numberMain');

            this.showMeterTab(id, tabTitle);
        }