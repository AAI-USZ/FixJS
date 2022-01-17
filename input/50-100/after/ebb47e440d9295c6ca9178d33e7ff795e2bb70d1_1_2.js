function(grid)
        {
            selectedIndex = grid.focus.rowIndex;
            selectedItem = grid.getItem(selectedIndex);
            id = grid.store.getValue(selectedItem, 'usage_idMeter');
            tabTitle = grid.store.getValue(selectedItem, 'meter_numberMain');

            bba.Meter.showMeterTab(id, tabTitle);
        }