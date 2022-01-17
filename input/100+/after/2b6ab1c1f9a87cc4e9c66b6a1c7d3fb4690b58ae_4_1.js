function(grid)
        {
            grid = (grid) ? grid : core.grids.supplierGrid;
            selectedIndex = grid.focus.rowIndex;
            selectedItem = grid.getItem(selectedIndex);
            id = grid.store.getValue(selectedItem, 'supplier_idSupplier');
            tabTitle = grid.store.getValue(selectedItem, 'supplier_name');

             bba.openTab({
                tabId : 'supplier' + id,
                title : (tabTitle) ? tabTitle : 'Supplier',
                url : './supplier/edit-supplier',
                content : {
                    type : 'details',
                    supplier_idSupplier : id
                }
            });
        }