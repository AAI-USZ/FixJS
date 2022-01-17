function(button, e, options) {

        //retrieve dataview and payment
        var dataview = this.up('dataview');
        var payment = this.getRecord();

        //removes payment from debt, then from the store
        payment.getDebt().payments().remove(payment);
        dataview.getStore().remove(payment);
        dataview.getStore().sync(); //sync with local storage

        //update the debt balance on deleted payment
        var debtRecord = dataview.up('DebtDetail').getRecord();
        debtRecord.set('balance',0); //calls convert field again on debt
        debtRecord.getPerson().calcBalance(); //calc balance of updated payments and debt in person

        //update debt balance label
        var balance = payment.getDebt().get('balance');
        var str = ((balance<0)?'-':'')+'$' + Math.abs(balance).toFixed(2);
        Ext.getCmp('debtHeaderLabel').setHtml(str);

        //update the summary
        Payback.app.application.getController('Payback.controller.Summary').updateSummary();

        //refresh DataView
        //dataview.refresh();
    }