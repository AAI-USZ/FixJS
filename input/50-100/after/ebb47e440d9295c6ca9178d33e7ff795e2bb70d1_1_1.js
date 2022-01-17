function(grid)
        {
            selectedIndex = grid.focus.rowIndex;
            selectedItem = grid.getItem(selectedIndex);
            id = grid.store.getValue(selectedItem, 'invoice_idInvoice');
            tabTitle = grid.store.getValue(selectedItem, 'invoice_numberInvoice');

            this.showInvoiceTab(id, tabTitle);
        }