function () {
        // one of the patient should be selected for posting drug order
        if (Ext.getCmp('patientList').getSelection()[0] != null) {
            concept = new Array();
            orderstore = new Array();
            order = new Array();
            var k = 0;
            for (i = 0; i <= form_num; i++) {
                // value of Url for get call is made here using name of drug
                var Url = HOST + '/ws/rest/v1/concept?q='
                Url = Url + Ext.getCmp('form' + i).getAt(0).getAt(0)._value.data.text
                concept.push(Ext.create('Screener.store.drugConcept'))
                // setting up the proxy for store with the above Url
                concept[i].setProxy({
                    type: 'rest',
                    url: Url,
                    headers: Util.getBasicAuthHeaders(),
                    reader: {
                        type: 'json',
                        rootProperty: 'results'
                    }
                })
                var startdate = new Date()
                // value of end date depending on the duration 
                var enddate
                if (Ext.getCmp('form' + i).getValues().duration == "1w") enddate = new Date(startdate.getFullYear(), startdate.getMonth(), startdate.getDate() + 7);
                if (Ext.getCmp('form' + i).getValues().duration == "1m") enddate = new Date(startdate.getFullYear(), startdate.getMonth() + 1, startdate.getDate());
                if (Ext.getCmp('form' + i).getValues().duration == "2m") enddate = new Date(startdate.getFullYear(), startdate.getMonth() + 2, startdate.getDate());
                // model for drug order is created here
                order.push(Ext.create('Screener.model.drugOrder', {
                    patient: Ext.getCmp('patientList').getSelection()[0].getData().uuid,
                    drug: Ext.getCmp('form' + i).getValues().drug,
                    startDate: startdate,
                    autoExpireDate: enddate,
                    dose: Ext.getCmp('form' + i).getValues().strength,
                    quantity: Ext.getCmp('form' + i).getValues().quantity,
                    frequency: Ext.getCmp('form' + i).getValues().frequency,
                    instructions: Ext.getCmp('form' + i).getValues().Instruction,
                    // type should be "drugorder" in order to post a drug order
                    type: 'drugorder'
                }))
                if(order[i].data.instructions == "") order[i].data.instructions = "-"
                orderstore.push(Ext.create('Screener.store.drugOrder'))
                // here it makes the get call for concept of related drug
                concept[i].load();
                // i added counter k which increment as a concept load successfully, after all the concept are loaded
                // value of k should be equal to the no. of drug forms
                concept[i].on('load', function () {
                    k = k + 1
                }, this);
            }
            concept[form_num].on('load', function () {
                // value of k is compared with the no of drug forms
                if (k == form_num + 1) {
                    for (var j = 0; j <= form_num; j++) {
                        order[j].data.concept = concept[j].getAt(0).getData().uuid
                        orderstore[j].add(order[j])
                        orderstore[j].sync()
                    }
                    orderstore[form_num].on('write',function(){
                        Ext.Msg.alert('successfull')
                    },this)
                } else Ext.Msg.alert("unsuccessfull")
            }, this, {
                // this allow the above function to be called after 600ms the "load" event is successfull
                // we are assuming that within 600ms we have got response for all the get calls.
                buffer: 600
            })
        } else Ext.Msg.alert("please select a patient")
    }