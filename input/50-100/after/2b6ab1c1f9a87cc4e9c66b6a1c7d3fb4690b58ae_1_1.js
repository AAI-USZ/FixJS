function(grid)
        {
            grid = (grid) ? grid : core.grids.contractGrid;
            selectedIndex = grid.focus.rowIndex;
            selectedItem = grid.getItem(selectedIndex);
            id = grid.store.getValue(selectedItem, 'contract_idContract');
            tabTitle = grid.store.getValue(selectedItem, 'client_name');

            this.showContractTab(id, tabTitle);
        }