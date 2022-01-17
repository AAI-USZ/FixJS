function(grid, row)
        {
            item = row.cell.field;
            rowIndex = row.rowIndex;
            selectedItem = grid.getItem(rowIndex);

            switch (item) {
                case 'meter_numberMain':
                    bba.Meter.showMeterTab(
                        grid.store.getValue(selectedItem, 'meter_idMeter'),
                        grid.store.getValue(selectedItem, 'meter_numberMain')
                    );
                    break;
                case 'contract_idContract':
                    bba.Contract.showContractTab(
                        grid.store.getValue(selectedItem, 'contract_idContract'),
                        grid.store.getValue(selectedItem, 'contract_idContract')
                    );
                    break;
                 case 'invoice_numberInvoice':
                    bba.Invoice.showInvoiceTab(
                        grid.store.getValue(selectedItem, 'invoiceLine_idInvoice'),
                        grid.store.getValue(selectedItem, 'invoice_numberInvoice')
                    );
                    break;
                default:
                    bba.Invoice.showInvoiceLineTab(
                        grid.store.getValue(selectedItem, 'invoiceLine_idInvoiceLine'),
                        grid.store.getValue(selectedItem, 'invoiceLine_idInvoiceLine')
                    );
                    break;
            }

            /*bba.Meter.showMeterTab(
                grid.store.getValue(selectedItem, 'meter_idMeter'),
                bba.tabPrefix.meter + grid.store.getValue(selectedItem, 'meter_numberMain')
            );

            bba.Contract.showContractTab(
                grid.store.getValue(selectedItem, 'contract_idContract'),
                bba.tabPrefix.contract + grid.store.getValue(selectedItem, 'contract_idContract')
            );

            bba.Invoice.showInvoiceLineTab(
                grid.store.getValue(selectedItem, 'invoiceLine_idInvoiceLine'),
                bba.tabPrefix.invoiceLine + grid.store.getValue(selectedItem, 'invoiceLine_idInvoiceLine')
            );*/
        }