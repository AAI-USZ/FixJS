function (thisCB,newVal,oldVal,eOpt) {
        //отримуємо поле по якшому здійснюється пошук
        var srchField=thisCB.getStore().getById(newVal).get('field');
        //в залежності від вибраного поля генеруємо відповідне поле вводу
        Ext.getCmp('nb-prod-srch-cont').remove('nb-prod-srch-fval',true);
        switch (srchField) {
            case 'id':          
            case 'product':   
            case 'model':
            case 'serialnum':
            case 'factorynum':
            case 'guarantee':
            case 'name':
            case 'personaldata':
            case 'address':
            case 'complaints':
            case 'preformance':
            case 'notes':    
            case 'check':
            case 'comments':
            case 'total':    
                var srchInput=Ext.create('Ext.form.field.Text',{
                    id: 'nb-prod-srch-fval',
                    labelWidth: 55,
                    fieldLabel: 'Значение',
                    width: 260,
                    allowBlank: false
                });
                break;
            case 'date_start':
            case 'date_end':
            case 'notified':            
                var srchInput=Ext.create('Ext.form.field.Date',{
                    id: 'nb-prod-srch-fval',
                    format: 'd.m.Y',
                    labelWidth: 55,
                    fieldLabel: 'Значение',
                    width: 260,
                    allowBlank: false                    
                });
                break;
            case 'blacklistID':            
                var srchInput=Ext.create('Ext.form.field.ComboBox',{
                    id: 'nb-prod-srch-fval',
                    labelWidth: 55,
                    fieldLabel: 'Значение',
                    width: 260,
                    store: 'Status',
                    displayField: 'name',
                    valueField: 'id',
                    forceSelection: true,
                    allowBlank: false
                });
                break;  
            case 'sellerID':            
                var srchInput=Ext.create('Ext.form.field.ComboBox',{
                    id: 'nb-prod-srch-fval',
                    labelWidth: 55,
                    fieldLabel: 'Значение',
                    width: 260,
                    store: 'Seller',
                    displayField: 'name',
                    valueField: 'id',
                    forceSelection: true,
                    allowBlank: false
                });
                break; 
            case 'masterID':            
                var srchInput=Ext.create('Ext.form.field.ComboBox',{
                    id: 'nb-prod-srch-fval',
                    labelWidth: 55,
                    fieldLabel: 'Значение',
                    width: 260,
                    store: 'Master',
                    displayField: 'name',
                    valueField: 'id',
                    forceSelection: true,
                    allowBlank: false
                });
                break; 
        }
        Ext.getCmp('nb-prod-srch-cont').add(srchInput);
    }