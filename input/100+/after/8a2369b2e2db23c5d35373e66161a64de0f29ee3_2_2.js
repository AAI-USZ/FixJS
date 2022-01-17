function() {
        var x;
        Ext.Ajax.request({
            url : HOST+'/ws/rest/v1/concept?q=height',
            method: 'GET',
            disableCaching: false,
            headers: Util.getBasicAuthHeaders(),
            failure: function (response) {
                console.log('GET failed with response status: '+ response.status); // + response.status);
            },
            success: function (response) {
                for(var i=0;i<JSON.parse(response.responseText).results.length;++i){
                    if(JSON.parse(response.responseText).results[i].display == 'HEIGHT (CM)'){
                        x = JSON.parse(response.responseText).results[i].uuid
                    }
                }
                if(x != localStorage.heightUuidconcept || localStorage.heightUuidconcept == undefined){
                    
                    for(var i1 =0;i1<resourceUuid.length;++i1){
                        var a = resourceUuid[i1]
                        Util.getAttributeFromREST(a[0], a[1], a[2])
                    }
                }
            }            
        });
    }