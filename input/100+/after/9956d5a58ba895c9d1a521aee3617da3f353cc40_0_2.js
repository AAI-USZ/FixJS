function () {
        if (Ext.getCmp('nb-prod-srch-field').isValid()) {
            var srchField=this.getStore('SearchField').getById(Ext.getCmp('nb-prod-srch-field').getValue());
            var prodLoadParams={};
            prodLoadParams.params={};
            prodLoadParams.params.search=1;
            prodLoadParams.params.table=srchField.get('table');
            prodLoadParams.params.field=srchField.get('field');
            switch (prodLoadParams.params.field) {
                case 'date_start':
                case 'date_end':
                case 'notified':
                case 'gdate':    
                    prodLoadParams.params.search_terms=Ext.Date.format(Ext.getCmp('nb-prod-srch-fval').getValue(),'d.m.Y');
                    break;
                default:
                    prodLoadParams.params.search_terms=Ext.getCmp('nb-prod-srch-fval').getValue();
                    break;
            }               
            prodLoadParams.params.between=0;
            if (Ext.getCmp('nb-prod-srch-per').getValue()) {
                prodLoadParams.params.between=1;
                prodLoadParams.params.first_date=Ext.Date.format(Ext.getCmp('nb-prod-srch-fdate').getValue(),'d.m.Y');
                prodLoadParams.params.second_date=Ext.Date.format(Ext.getCmp('nb-prod-srch-sdate').getValue(),'d.m.Y');
            }
            this.getStore('Product').load(prodLoadParams);
            this.prodSearchWin.close();
        }
    }