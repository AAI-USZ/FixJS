function(){
        
        //funciton to get the date in required format of the openMRS, since the default extjs4 format is not accepted
        function ISODateString(d){
            function pad(n){
                return n<10 ? '0'+n : n
            }
            return d.getUTCFullYear()+'-'
            + pad(d.getUTCMonth()+1)+'-'
            + pad(d.getUTCDate())+'T'
            + pad(d.getUTCHours())+':'
            + pad(d.getUTCMinutes())+':'
            + pad(d.getUTCSeconds())+'Z'
        }
        var currentDate = new Date();
        // creates the encounter json object
        var jsonencounter = Ext.create('Registration.model.encounterModel',{
            encounterDatetime : ISODateString(currentDate),
            patient: localStorage.uuid,//you will get the uuid from ticket 144...pass it here
            encounterType: localStorage.regUuidencountertype//need to pass the type depending on the type of encounter
        });
        // the 3 fields "encounterDatetime, patient, encounterType" are obligatory fields rest are optional
        var location ="Registration Desk";
        //var form = localStorage.basicUuidform;
        var provider1 = "";
        var orders1 = "";
        jsonencounter.data.obs = [];
        jsonencounter.data.provider = [];
        jsonencounter.data.orders = [];
        // the variables above are hard coded...will get them from somewhere else
        // the if statement is to check whether the field is null or not..persist false does not pass that field details into the server. this is done to avoid 500 error
        if(location != ""){
            jsonencounter.data.location = location;
            Registration.model.encounterModel.getFields()[3].persist = true;
        }
        else{
            Registration.model.encounterModel.getFields()[3].persist = false;
        }
        /*if(form != ""){
            jsonencounter.data.form = form;
            Registration.model.encounterModel.getFields()[4].persist = true;
        }
        else{
            Registration.model.encounterModel.getFields()[4].persist = false;
        }*/
        if(provider1 != ""){
            jsonencounter.data.provider = provider1;
            Registration.model.encounterModel.getFields()[4].persist = true;
        //should create an instance of the provider model and push it to the empthy array created...for example see the height instance in obs
        }
        else{
            Registration.model.encounterModel.getFields()[4].persist = false;
        }
        if(orders1 != ""){
            jsonencounter.data.orders = orders1;
            Registration.model.encounterModel.getFields()[5].persist = true;
        }
        else{
            Registration.model.encounterModel.getFields()[5].persist = false;
        }
        
        if((Ext.getCmp('heightIDcm').isValid() && Ext.getCmp('heightIDcm').value != null)||(Ext.getCmp('weightIDkg').isValid() && Ext.getCmp('weightIDkg').value != null)||(Ext.getCmp('bmiNumberfieldID').isValid() && Ext.getCmp('bmiNumberfieldID').value != null)||(Ext.getCmp('registrationfeespaid').isValid() && Ext.getCmp('registrationfeespaid').value != null))
        {
            Registration.model.encounterModel.getFields()[6].persist = true;
        }
        else{
            Registration.model.encounterModel.getFields()[6].persist = false;
        }
        //get the values of each obs from the bmi or registration field
        if(Ext.getCmp('heightIDcm').isValid() && Ext.getCmp('heightIDcm').value != null){
            var jsonencounterheight = Ext.create('Registration.model.obsModel',{
                obsDatetime : ISODateString(currentDate),
                person: localStorage.uuid,
                concept: localStorage.heightUuidconcept,
                value: parseInt(Ext.getCmp('heightIDcm').getValue())
            });
            jsonencounter.data.obs.push(jsonencounterheight.data);
        }
        if(Ext.getCmp('weightIDkg').isValid() && Ext.getCmp('weightIDkg').value != null){
            var jsonencounterweight = Ext.create('Registration.model.obsModel',{
                obsDatetime : ISODateString(currentDate),
                person: localStorage.uuid,
                concept: localStorage.weightUuidconcept,
                value: parseFloat(Ext.getCmp('weightIDkg').getValue())
            });
            jsonencounter.data.obs.push(jsonencounterweight.data);
        }
        if(Ext.getCmp('bmiNumberfieldID').isValid() && Ext.getCmp('bmiNumberfieldID').value != null){
            var jsonencounterbmi = Ext.create('Registration.model.obsModel',{
                obsDatetime : ISODateString(currentDate),
                person: localStorage.uuid,
                concept: localStorage.BMIUuidconcept,
                value: parseFloat(Ext.getCmp('bmiNumberfieldID').getValue())
            });
            jsonencounter.data.obs.push(jsonencounterbmi.data);
        }
        if(Ext.getCmp('registrationfeespaid').isValid() && Ext.getCmp('registrationfeespaid').value != null){
            var jsonencounterregfee = Ext.create('Registration.model.obsModel',{
                obsDatetime : ISODateString(currentDate),
                person: localStorage.uuid,
                concept: localStorage.regfeeUuidconcept,
                value: Ext.getCmp('registrationfeespaid').value
            });
            jsonencounter.data.obs.push(jsonencounterregfee.data);
        }
        var store = Ext.create('Registration.store.encounterStore');
        store.add(jsonencounter);
        store.sync();
        store.on('write', function () {
            this.reset();
        }, this)
        return store;
    }