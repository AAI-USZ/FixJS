function(dom, ready, parser, xhr, registry, bba){

    ready(function () {

        if (dom.byId('invoice')) {
            dom.byId('invoice').focus();
        }

        if (dom.byId('invoiceGrid')) {
            var form = registry.byId('Search');
            if (form) bba.gridSearch(form, invoiceGrid);
        }
    });

    bba.Invoice = {
        gridLayouts : {
            invoice : [
                {field: 'invoice_idInvoice', width: '50px', name: 'Id'},
                {field: 'invoice_type', width: '100px', name: 'Type'},
                {field: 'invoice_nameSupplier', width: '200px', name: 'Supplier'},
                {field: 'invoice_dateInvoice', width: '150px', name: 'Invoice Date'},
                {field: 'invoice_amountTotal', width: '100px', name: 'Total'},
                {field: 'invoice_refSupplier', width: '150px', name: 'Supplier Ref'},
                {field: 'invoice_numberInvoice', width: '100px', name: 'Invoice No.'},
                {field: '', width: 'auto', name: ''}
            ],
            invoiceLines : [
                {field: 'invoiceLine_idInvoiceLine', width: '50px', name: 'Id'},
                {field: 'meter_numberMain', width: '120px', name: 'Meter No'},
                {field: 'contract_idContract', width: '100px', name: 'Contract Id'},
                {field: 'invoiceLine_dateStart', width: '150px', name: 'Start Date'},
                {field: 'invoiceLine_dateEnd', width: '150px', name: 'End Date'},
                {field: 'invoiceLine_fee', width: '50px', name: 'Fee'},
                {field: 'invoiceLine_commission', width: '100px', name: 'Commission'},
                {field: 'invoiceLine_consumption', width: '110px', name: 'Consumption'},
                {field: 'invoiceLine_amount', width: '100px', name: 'Amount'},
                {field: 'invoiceLine_proportionInvoiced', width: '50px', name: 'Claim'},
                {field: 'invoiceLine_reference', width: '100px', name: 'Invoice Line Ref'},
                {field: 'invoiceLine_dateCreated', width: '150px', name: 'Date Created'},
                {field: '', width: 'auto', name: ''}
            ],
            invoiceUsage : [
                {field: 'invoiceUsage_idInvoiceLine', width: '50px', name: 'Id'},
                {field: 'invoiceUsage_idUsage', width: '150px', name: 'Usage Id'},
                {field: 'invoiceUsage_typeMatch', width: '150px', name: 'Type Match'},
                {field: 'invoiceUsage_dateCreated', width: '150px', name: 'Date Created'},
                {field: 'usage_dateReading', width: '150px', name: 'Reading Date'},
                {field: 'usage_totalUsage', width: '150px', name: 'Reading Usage'},
                {field: '', width: 'auto', name: ''}
            ]
        },

        invoiceGridRowClick : function(grid)
        {
            selectedIndex = grid.focus.rowIndex;
            selectedItem = grid.getItem(selectedIndex);
            id = grid.store.getValue(selectedItem, 'invoice_idInvoice');
            tabTitle = bba.tabPrefix.invoice + grid.store.getValue(
                selectedItem, 'invoice_numberInvoice'
            );

            this.showInvoiceTab(id, tabTitle);
        },

        showInvoiceTab : function(id, tabTitle)
        {
            bba.openTab({
                tabId : 'invoice' + id,
                title : (tabTitle) ? tabTitle : 'Invoice',
                url : './invoice/invoice',

                content : {
                    type : 'details',
                    invoice_idInvoice : id
                }
            });
        },

        invoiceLineGridRowClick : function(grid, row)
        {
            item = row.cell.field;
            rowIndex = row.rowIndex;
            selectedItem = grid.getItem(rowIndex);

            switch (item) {
                case 'meter_numberMain':
                    bba.Meter.showMeterTab(
                        grid.store.getValue(selectedItem, 'meter_idMeter'),
                        bba.tabPrefix.meter + grid.store.getValue(selectedItem, 'meter_numberMain')
                    );
                    break;
                case 'contract_idContract':
                    bba.Contract.showContractTab(
                        grid.store.getValue(selectedItem, 'contract_idContract'),
                        bba.tabPrefix.contract + grid.store.getValue(selectedItem, 'contract_idContract')
                    );
                    break;
                 case 'invoice_numberInvoice':
                    bba.Invoice.showInvoiceTab(
                        grid.store.getValue(selectedItem, 'invoiceLine_idInvoice'),
                        bba.tabPrefix.invoice + grid.store.getValue(selectedItem, 'invoice_numberInvoice')
                    );
                    break;
                default:
                    bba.Invoice.showInvoiceLineTab(
                        grid.store.getValue(selectedItem, 'invoiceLine_idInvoiceLine'),
                        bba.tabPrefix.invoiceLine + grid.store.getValue(selectedItem, 'invoiceLine_idInvoiceLine')
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
        },

        invoiceUsageGridRowClick : function(grid)
        {
            selectedIndex = grid.focus.rowIndex;
            selectedItem = grid.getItem(selectedIndex);
            id = grid.store.getValue(selectedItem, 'usage_idMeter');
            tabTitle = 'M-' + grid.store.getValue(selectedItem, 'meter_numberMain');

            bba.Meter.showMeterTab(id, tabTitle);
        },

        showInvoiceLineTab : function(id, tabTitle)
        {
            bba.openTab({
                tabId : 'invoiceLine' + id,
                title : (tabTitle) ? tabTitle : 'Invoice Line',
                url : './invoice/invoice-line',

                content : {
                    type : 'details',
                    invoiceLine_idInvoiceLine : id
                }
            });
        }
    }

    return bba.Invoice;

}