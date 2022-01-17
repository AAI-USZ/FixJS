function(grid)
        {
            selectedIndex = grid.focus.rowIndex;
            selectedItem = grid.getItem(selectedIndex);

            bba.Meter.showMeterTab(
                grid.store.getValue(selectedItem, 'meter_idMeter'),
                'M-' + grid.store.getValue(selectedItem, 'meter_numberMain')
            );

            bba.Contract.showContractTab(
                grid.store.getValue(selectedItem, 'contract_idContract'),
                'C-' + grid.store.getValue(selectedItem, 'contract_idContract')
            );

            bba.Invoice.showInvoiceLineTab(
                grid.store.getValue(selectedItem, 'invoiceLine_idInvoiceLine'),
                'IL-' + grid.store.getValue(selectedItem, 'invoiceLine_idInvoiceLine')
            );
        }