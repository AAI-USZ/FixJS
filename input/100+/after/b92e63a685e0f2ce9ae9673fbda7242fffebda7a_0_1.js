function(dom, ready, parser, connect, xhr, array, registry, Dialog, ItemFileReadStore, dojo, bba) {

    ready(function () {

        if (dom.byId('contract')) {
            dom.byId('contract').focus();
        }

        if (dom.byId('contractGrid')) {
            var form = registry.byId('Search');
            if (form) bba.gridSearch(form, contractGrid);
        }
    });

    bba.Contract = {
        gridLayouts : {
            contract : [
                {field: 'contract_idContract', width: '50px', name: 'Id'},
                {field: 'client_name', width: '250px', name: 'Client'},
                {field: 'contract_type', width: '110px', name: 'Type'},
                {field: 'contract_status', width: '110px', name: 'Status'},
                {field: 'contract_dateStart', width: '90px', name: 'Start Date'},
                {field: 'contract_dateEnd', width: '90px', name: 'End Date'},
                {field: 'meter_count', width: '100px', name: 'No. Meters'},
                {field: 'supplier_nameShort', width: '100px', name: 'Supplier'},
                {field: 'contract_reference', width: '200px', name: 'Reference'},
                {field: 'contract_desc', width: '300px', name: 'Description'},
                {field: '', width: 'auto', name: ''}
            ],
            meterContract : [
                {
                    type: "dojox.grid._CheckBoxSelector"
                },
                [
                    {field: 'meter_idMeter', width: '50px', name: 'Id'},
                    {field: 'meter_numberMain', width : '150px', name: 'Number Main'},
                    {field: 'meter_status', width : '100px', name: 'Meter Status'},
                    {field: 'meterContract_kvaNominated', width: '100px', name: 'Peak kVA', editable: true},
                    {field: 'meterContract_eac', width: '100px', name: 'EAC', editable: true},
                    {field: 'contract_idContract', width: '100px', name: 'Contract Id'},
                    {field: 'contract_type', width: '100px', name: 'Contract Type'},
                    {field: 'contract_status', width: '100px', name: 'Status'},
                    {field: 'contract_dateStart', width: '100px', name: 'Start Date'},
                    {field: 'contract_dateEnd', width: '100px', name: 'End Date'},
                    {field: '', width: 'auto', name: ''}
                ]
            ],
            meter : [
                {field: 'meter_idMeter', width: '50px', name: 'Id'},
                {field: 'meter_type', width: '85px', name: 'Meter Type'},
                {field: 'meter_status', width: '110px', name: 'Meter Status'},
                {field: 'meter_numberTop', width: '100px', name: 'Number Top'},
                {field: 'meter_numberMain', width: '120px', name: 'Number Main'},
                {field: 'meterContract_kvaNominated', width: '70px', name: 'Peak kVA'},
                {field: 'meterContract_eac', width: '70px', name: 'EAC'},
                {field: 'clientAd_addressName', width : '150px', name: 'Address Name'},
                {field: 'clientAd_address1', width : '150px', name: 'Address Line 1'},
                {field: 'clientAd_address2', width: '150px', name: 'Address Line 2'},
                {field: 'clientAd_address3', width: '150px', name: 'Address Line 3'},
                {field: 'clientAd_postcode', width: '85px', name: 'Postcode'},
                {field: '', width: 'auto', name: ''}
            ],
            tender : [
                {field: 'tender_idTender', width: '50px', name: 'Id'},
                {field: 'supplier_nameShort', width : '80px', name: 'Supplier'},
                {field: 'supplierPers_name', width : '150px', name: 'Supplier Liaison'},
                {field: 'supplierPers_phone', width: '100px', name: 'Phone'},
                {field: 'tender_periodContract', width: '100px', name: 'Contract Period'},
                {field: 'tender_dateExpiresQuote', width: '100px', name: 'Quote Expires'},
                {field: 'tender_chargeStanding', width: '100px', name: 'Standing Charge'},
                {field: 'tender_priceUnitDay', width: '100px', name: 'Day Rate'},
                {field: 'tender_priceUnitNight', width: '100px', name: 'Night Rate'},
                {field: 'tender_priceUnitOther', width: '100px', name: 'Other Rate'},
                {field: 'tender_desc', width: '200px', name: 'Desc.'},
                {field: '', width: 'auto', name: ''}
            ],
            invoiceLines : [
                {field: 'invoiceLine_idInvoiceLine', width: '50px', name: 'Id'},
                {field: 'meter_numberMain', width: '120px', name: 'Meter No'},
                {field: 'invoice_numberInvoice', width: '100px', name: 'Invoice No.'},
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
            ]
        },

        numberComparison : function (a, b) {
            a = Number(a);
            b = Number(b);
            if (a < b){
                return -1
            } else if (a > b) {
                return 1;
            } else {
                return 0;
            }
        },

        preselectMeters : function(grid, id, items)
        {
            contractMeterStore.comparatorMap = {};
            contractMeterStore.comparatorMap["meter_idMeter"] = bba.Contract.numberComparison;
            contractMeterStore.comparatorMap["contract_idContract"] = bba.Contract.numberComparison;

            array.forEach(items, function(item){
                if (item.contract_idContract == id) {
                    grid.selection.addToSelection(item)
                }
            });
        },

        selectAll : function(grid)
        {
            for (i = 0; i < grid.rowCount; i++) {
              var obj = grid.getItem(i);
              grid.selection.addToSelection(obj);
            }
        },

        addMeterToContract : function(grid, meterContract)
        {
            var items = grid.selection.getSelected();

            var kvaError = false;

            var data = {type: 'insert', contract : meterContract, meters : []};

            if (items.length) {
                items.forEach(function(selectedItem){
                    if (!selectedItem.meterContract_kvaNominated || !selectedItem.meterContract_eac) {
                        kvaError = true;
                        return false;
                    }

                    data.meters.push({
                        id : selectedItem.meter_idMeter[0],
                        kva : selectedItem.meterContract_kvaNominated[0],
                        eac : selectedItem.meterContract_eac[0]
                    });
                });
            }

            if (!kvaError) {
                xhr.post({
                    url: './contract/save-meter-contract',
                    content: {jsonData : dojo.toJson(data)},
                    handleAs: 'json',
                    preventCache: true,
                    load: function(data) {
                        dom.byId('dialog').innerHTML = data.html;
                        parser.parse('dialog');

                        if (data.error) {
                            error.show();
                        } else if (data.saved) {
                            registry.byId('meterContractGrid' + meterContract)._refresh();
                            registry.byId('addMeterContractDialog').hide();
                            confirm.show();
                        }
                    }
                });
            } else {
                alert('Please enter Peak kVA and EAC for all selected meters (enter zero if not known).');
            }
        },

        addMeterButtonClick : function(contentVars)
        {
            if (!dom.byId('addMeterContractDialog')) {

                addMeterContractDialog = new Dialog({
                    id: 'addMeterContractDialog',
                    title: 'Add/Edit Meters on Contract',
                    ioArgs: {
                        content: dojo.mixin({type : 'add'}, contentVars)
                    },
                    ioMethod: dojo.xhrPost,
                    href: './contract/add-meter-contract',
                    onHide: function() {
                        bba.closeDialog(this);
                    }
                });
            }

            addMeterContractDialog.show();
        },

        contractGridRowClick : function(grid)
        {

            selectedIndex = grid.focus.rowIndex;
            selectedItem = grid.getItem(selectedIndex);
            id = grid.store.getValue(selectedItem, 'contract_idContract');
            tabTitle = grid.store.getValue(selectedItem, 'client_name');

            this.showContractTab(id, tabTitle);
        },

        showContractTab : function(id, tabTitle)
        {
            bba.openTab({
                tabId : 'contract' + id,
                title : (tabTitle) ? tabTitle : 'Contract',
                url : './contract/edit-contract',
                content : {
                    type : 'details',
                    contract_idContract : id
                }
            });
        },

        tenderGridRowClick : function(grid, contentVars)
        {
            selectedIndex = grid.focus.rowIndex;
            selectedItem = grid.getItem(selectedIndex);
            id = grid.store.getValue(selectedItem, 'tender_idTender');
            tabTitle = grid.store.getValue(selectedItem, 'supplier_name');

            bba.openTab({
                tabId : 'tender' + id,
                title : (tabTitle) ? tabTitle : 'Tender',
                url : './contract/edit-tender',
                content : dojo.mixin({
                    type :  'details',
                    tender_idTender : id
                }, contentVars)
            });
        },

        editContractButtonClick : function(contentVars)
        {
            if (!dom.byId('contractForm')) {
                bba.openFormDialog({
                    url: './contract/edit-contract',
                    content: dojo.mixin({type :  'edit'}, contentVars),
                    dialog: 'contractForm',
                    deferredFunction: function() {
                        bba.Contract.setupDocEvents();
                    }
                });
            } else {
                contractForm.show();
            }
        },

        editTenderButtonClick : function(contentVars)
        {
            if (!dom.byId('tenderForm')) {
                bba.openFormDialog({
                    url: './contract/edit-tender',
                    content: dojo.mixin({type :  'edit'}, contentVars),
                    dialog: 'tenderForm'
                });
            } else {
                tenderForm.show();
            }
        },

        newContractButtonClick : function(contentVars)
        {
            if (!dom.byId('contractForm')) {
                bba.openFormDialog({
                    url: './contract/add-contract',
                    content: dojo.mixin({type :  'add'}, contentVars),
                    dialog: 'contractForm',
                    deferredFunction: function() {
                        bba.Contract.setupDocEvents();
                    }
                });
            } else {
                contractForm.show();
            }
        },

        newTenderButtonClick : function(contentVars)
        {
            if (!dom.byId('tenderForm')) {
                bba.openFormDialog({
                    url: './contract/add-tender',
                    content: dojo.mixin({type :  'add'}, contentVars),
                    dialog: 'tenderForm',
                    deferredFunction: function() {
                        bba.Contract.tenderStore = new ItemFileReadStore({
                            url:'./supplier/data-store/type/supplierList'
                        });

                        bba.Contract.tenderStore.fetch({
                            onError: function(error, request) {
                                bba.dataStoreError(request.store.url, null);
                            }
                        });

                        registry.byId("tender_idSupplier").set('store', bba.Contract.tenderStore);
                        registry.byId("tender_idSupplier").set('value', '0');
                        bba.Contract.changeSupplierContact('');
                    }
                });
            } else {
                tenderForm.show();
            }
        },

        changeSupplierPersonnel : function(val)
        {
            registry.byId('tender_idSupplierPersonnel').set('value', '');

            this.supplierPersonnelStore = new ItemFileReadStore({
                url:'./supplier/data-store/type/supplierPersonnel/supplierId/' + val
            });

            this.supplierPersonnelStore.fetch({
                onError: function(error, request) {
                    bba.dataStoreError(request.store.url, null);
                }
            });

            registry.byId("tender_idSupplierPersonnel").set('store', this.supplierPersonnelStore);
            registry.byId('tender_idSupplierPersonnel').set('value', 0);
        },

        processContractForm : function()
        {
            bba.closeDialog(contractForm);

            data = arguments[0];

            dom.byId('dialog').innerHTML = data.html;
            parser.parse('dialog');

            if (data.error) {
                error.show();
            } else if (data.saved > 0) {
                if (data.contract_idContract) {
                    registry.byId('contract' + data.contract_idContract).refresh();
                }

                if (dom.byId('contractGrid')) contractGrid._refresh();

                if (bba.confrimBox) {
                    confirm.show();
                }

                if (data.client_name) {
                    bba.Contract.showContractTab(data.saved, data.client_name);
                }
            } else {
                bba.setupDialog(contractForm);
                bba.Contract.setupDocEvents();
                contractForm.show();
            }
        },

        processTenderForm : function()
        {
            //bba.closeDialog(tenderForm);

            values = arguments[0];
            values.type = (values.tender_idTender) ? 'edit' : 'add';

            xhr.post({
                url: './contract/save-tender',
                content: values,
                handleAs: 'json',
                preventCache: true,
                load: function(data) {
                    dom.byId('dialog').innerHTML = data.html;
                    parser.parse('dialog');

                    if (data.error) {
                        error.show();
                    } else if (data.saved > 0) {
                        if (values.tender_idTender) {
                            registry.byId('tender' + values.tender_idTender).refresh();
                        } else if (registry.byId('tenderGrid' + values.tender_idContract)) {
                            registry.byId('tenderGrid' + values.tender_idContract)._refresh();
                        }

                        if (bba.confrimBox) {
                            confirm.show();
                        }
                    } else {
                        bba.setupDialog(tenderForm);
                        tenderForm.show();
                    }
                }
            });
        },

        setupDocEvents : function()
        {
            var docs = [
              'contract_docAnalysis',
              'contract_docContractSearchable',
              'contract_docContractSignedClient',
              'contract_docContractSignedBoth',
              'contract_docTermination'
            ];

            array.forEach(docs, function(item, idx){
                if (registry.byId(item)) {
                    if (idx < 4) {
                        registry.byId(item).submit = function(){return false;}
                    }

                    dojo.connect(dom.byId(item + '_file'), "onclick", function(){
                        dojo.query('input[name=' + item + ']')[0].click();
                    });

                    connect.connect(registry.byId(item), "onChange", function(fileArray){
                        bba.docFileList(fileArray, item + '_file');
                    });
                }
            });

            connect.connect(contract_docTermination, "onComplete", bba.Contract.processContractForm);
            connect.connect(contract_docTermination, "onError", bba.Contract.processContractForm);
        }
    }

    return bba.Contract;
}