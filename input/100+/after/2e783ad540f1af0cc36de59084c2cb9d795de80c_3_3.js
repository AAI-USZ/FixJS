function(uuid) {
        concept = new Array();
        order = new Array();
        var k = 0,k1 = 0,k2 = 0;
        var drugs = Ext.getStore('orderStore').data;
        var noofdrugs = drugs.items.length;
        for (var i1 = 0; i1 < drugs.items.length; i1++) {
            // value of Url for get call is made here using name of drug
            if(drugs.items[i1].data.drugname != ""){
                k2++;
                var Url = HOST + '/ws/rest/v1/concept?q='
                Url = Url + drugs.items[i1].data.drugname
                concept.push(Ext.create('RaxaEmr.Pharmacy.store.drugConcept'))
                // setting up the proxy for store with the above Url
                concept[k++].setProxy({
                    type: 'rest',
                    url: Url,
                    headers: Util.getBasicAuthHeaders(),
                    reader: {
                        type: 'json',
                        root: 'results'
                    }
                })
                var startdate = new Date()
                // value of end date depending on the duration 
                var enddate
                if (drugs.items[i1].data.duration == "1 week") enddate = new Date(startdate.getFullYear(), startdate.getMonth(), startdate.getDate() + 7);
                if (drugs.items[i1].data.duration == "2 week") enddate = new Date(startdate.getFullYear(), startdate.getMonth(), startdate.getDate()+ 14);
                if (drugs.items[i1].data.duration == "3 week") enddate = new Date(startdate.getFullYear(), startdate.getMonth(), startdate.getDate()+ 21);
                if (drugs.items[i1].data.duration == "1 month") enddate = new Date(startdate.getFullYear(), startdate.getMonth()+ 1, startdate.getDate());
                if (drugs.items[i1].data.duration == "2 month") enddate = new Date(startdate.getFullYear(), startdate.getMonth()+ 2, startdate.getDate());
                // model for drug order is created here
                order.push({
                    patient: uuid,
                    drug: drugs.items[i1].data.drugname,
                    startDate: startdate,
                    autoExpireDate: enddate,
                    dose: drugs.items[i1].data.dosage,
                    quantity: drugs.items[i1].data.qty,
                    // type should be "drugorder" in order to post a drug order
                    type: 'drugorder'
                })
                // here it makes the get call for concept of related drug
                concept[i1].load();
                // added a counter k which increment as a concept load successfully, after all the concept are loaded
                // value of k should be equal to the no. of drug forms
                concept[i1].on('load', function () {
                    console.log(Ext.getStore('orderStore'));
                    k1++;
                    if (k == drugs.items.length && k1 == k2) {
                        for (var j = 0; j < concept.length; j++) {
                            order[j].concept = concept[j].getAt(0).getData().uuid;
                        }
                        if(order.length == 0){
                            RaxaEmr.Pharmacy.model.drugEncounter.getFields()[4].persist = false;
                        }
                        var time = this.ISODateString(new Date());
                        // model for posting the encounter for given drug orders
                        var encounter = Ext.create('RaxaEmr.Pharmacy.model.drugEncounter', {
                            patient: uuid,
                            // this is the encounter for the prescription encounterType
                            encounterType: localStorage.pharmacyUuidencountertype,
                            encounterDatetime: time,
                            orders: order
                        })
                        var encounterStore = Ext.create('RaxaEmr.Pharmacy.store.drugEncounter')
                        encounterStore.add(encounter)
                        // make post call for encounter
                        encounterStore.sync()
                        encounterStore.on('write', function () {
                            Ext.Msg.alert('successfull');
                            Ext.getStore('orderStore').removeAll();
                        //Note- if we want add a TIMEOUT it shown added somewhere here
                        }, this)
                    }
                }, this);
            }
            else{
                if (i1 == drugs.items.length - 1) {
                    for (var j = 0; j < concept.length; j++) {
                        order[j].concept = concept[j].getAt(0).getData().uuid;
                        console.log(concept[j].getAt(0).getData().uuid);
                    }
                    var time = this.ISODateString(new Date());
                    // model for posting the encounter for given drug orders
                    var encounter = Ext.create('RaxaEmr.Pharmacy.model.drugEncounter', {
                        patient: uuid,
                        // this is the encounter for the prescription encounterType
                        encounterType: localStorage.pharmacyUuidencountertype,
                        encounterDatetime: time,
                        orders: order
                    })
                    var encounterStore = Ext.create('RaxaEmr.Pharmacy.store.drugEncounter')
                    encounterStore.add(encounter)
                    // make post call for encounter
                    encounterStore.sync()
                    encounterStore.on('write', function () {
                        Ext.Msg.alert('successfull')
                    //Note- if we want add a TIMEOUT it shown added somewhere here
                    }, this)
                }
            }
        }
    }