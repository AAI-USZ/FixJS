function(grid)
        {
            selectedIndex = grid.focus.rowIndex;
            selectedItem = grid.getItem(selectedIndex);
            id = grid.store.getValue(selectedItem, 'invoice_idInvoice');
            tabTitle = 'I-' + grid.store.getValue(selectedItem, 'invoice_numberInvoice');

             bba.openTab({
                tabId : 'invoice' + id,
                title : (tabTitle) ? tabTitle : 'Invoice',
                url : './invoice/invoice',

                content : {
                    type : 'details',
                    invoice_idInvoice : id
                }
            });
        }