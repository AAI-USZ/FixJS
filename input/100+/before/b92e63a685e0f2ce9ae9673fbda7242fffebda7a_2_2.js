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
                bba.Meter.gridLayouts.meter[5],
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

            ]
        },

        invoiceGridRowClick : function(grid)
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
        },

        invoiceLineGridRowClick : function(grid)
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