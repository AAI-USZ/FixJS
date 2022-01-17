function(step,arg){
        if(arg){
            if(step==='family'){
                //add family
                var name = Ext.getCmp('familyName').getValue();
                var address = Ext.getCmp('address').getValue();
                var description = Ext.getCmp('description').getValue();
                
                if(familyName=='' || address==''){
                    Ext.Msg.alert("Error", "Please fill in all fields");
                }else{
                    console.log('adding fami');
                    var familyStore = Ext.getStore('families');
                    if(!familyStore){
                        familyStore = Ext.create('chw.store.families');
                    }
                    var count = familyStore.getCount();
                    count = count+1;
                    var familyModel = Ext.create('chw.model.family',{
                        familyName: name,
                        familyAddress: address,
                        familyDescrip: description,
                        familyId: count,
                        familyLatitude: 25,
                        familyLongitude: 25,
                        familyImage: 'resources/home.png',
                        familyDistance: 30
                    });
                    
                    familyStore.add(familyModel);
                    familyStore.sync();
                    //                    familyStore.on('write',function(){
                    console.log('Added family locally');
                    Ext.getCmp('familyName').reset();
                    Ext.getCmp('address').reset();
                    Ext.getCmp('description').reset();
                    Ext.getCmp('viewPort').setActiveItem(PAGES.familyList);
                //                    })
                }
            }else if(step==='patient'){
            //add patient
            }
        }
    }