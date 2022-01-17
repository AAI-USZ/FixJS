function(button, e, options) {
        var form = this.getPaymentDetail(),
            record = form.getRecord(),
            values = form.getValues(),
            debt = this.getDebtDetail().getRecord();

        values.amount = (values.amount)?values.amount.toFixed(2):0;

        if(record) { //if editing record
            record.set(values);
            record.save();
        } else { //if new record
            var payment = debt.payments().add(values)[0];
            debt.payments().sync();
            payment.getDebt(); //bug in framework(reported as TOUCH-3073), associates payment with debt 

            //bug in the framework(fixed), this allows the dataview to update the list when a record is added the first time and no other are in the store
            /*payment.save({
            callback:function(){
            this.getMyPaymentDataView().refresh();
            }
            },this);*/

            //bug in framework, debt_id is not correctly set in filter, work around is to delete the store and reassociate
            delete debt.paymentsStore; 
            debt.payments();
        }

        //update the debt balance on new payments
        //var debtRecord = this.getDebtDetail().getRecord();
        debt.set('balance',0); // calls convert field on debt
        debt.getPerson().calcBalance(); //calc balance of updated payments and debt in person

        //loads data from localStorage
        Ext.getStore('Payments').load();

        //update people store and summary
        Ext.getStore('People').load(function(){
            this.getApplication().getController('Summary').updateSummary();
        },
        this);

        //update debt balance label
        var balance = debt.get('balance');
        var str = ((balance<0)?'-':'')+'$' + Math.abs(balance).toFixed(2);
        this.getDebtHeaderLabel().setHtml(str);

        //set active item
        Ext.Viewport.setActiveItem(this.getDebtDetail());

    }