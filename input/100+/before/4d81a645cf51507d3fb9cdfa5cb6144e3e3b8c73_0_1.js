function(grid, row, item)
        {
            //item = row.cell.field;
            rowIndex = row.rowIndex;
            selectedItem = grid.getItem(rowIndex);

            switch (item) {
                case 'meter_numberMain':
                    meter.showMeterTab(
                        grid.store.getValue(selectedItem, 'meter_idMeter'),
                        grid.store.getValue(selectedItem, 'meter_numberMain')
                    );
                    break;
                case 'contract_idContract':
                    contract.showContractTab(
                        grid.store.getValue(selectedItem, 'contract_idContract'),
                        grid.store.getValue(selectedItem, 'contract_idContract')
                    );
                    break;
                 case 'invoice_numberInvoice':
                    this.showInvoiceTab(
                        grid.store.getValue(selectedItem, 'invoiceLine_idInvoice'),
                        grid.store.getValue(selectedItem, 'invoice_numberInvoice')
                    );
                    break;
                default:
                    this.showInvoiceLineTab(
                        grid.store.getValue(selectedItem, 'invoiceLine_idInvoiceLine'),
                        grid.store.getValue(selectedItem, 'invoiceLine_idInvoiceLine')
                    );
                    break;
            }
        }