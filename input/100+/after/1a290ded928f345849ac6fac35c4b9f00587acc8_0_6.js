function(Uuid){
        
        //Function for getting date in correct format
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
        //Creating the encounter model and hard-coding the encounter type uuid and provider uuid
        var JSONEncounter = Ext.create(mUserStories.model.encounterModel,{
            encounterDatetime: ISODateString(new Date()),
            patient: Uuid,
            encounterType: '70a8f272-7978-4713-b8cf-d0a40a46eeb5',
            provider : USER.uuid
        })
        
        //Create the encounter store and POST the encounter
        var store = Ext.create('mUserStories.store.encounterStore');
        store.add(JSONEncounter);
        store.sync();
    }