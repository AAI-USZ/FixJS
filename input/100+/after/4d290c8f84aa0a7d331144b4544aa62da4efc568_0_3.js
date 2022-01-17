function(resource,queryParameter,display) {

        //Ajax Request to get Height / Weight / Bmi Attribiutes from Concept Resource
        Ext.Ajax.request({
            url : HOST+'/ws/rest/v1/'+resource+'?q='+queryParameter,  //'/ws/rest/v1/concept?q=height',
            method: 'GET',
            disableCaching: false,
            headers: Util.getBasicAuthHeaders(),
            failure: function (response) {
                console.log('GET failed with response status: '+ response.status); // + response.status);
            },
            success: function (response) {
                for(var i=0;i<JSON.parse(response.responseText).results.length;++i){
                    if(JSON.parse(response.responseText).results[i].display == display){
                        if(resource != 'location'){
                            localStorage.setItem(queryParameter+"Uuid"+resource,JSON.parse(response.responseText).results[i].uuid)
                        }
                        else{console.log
                            localStorage.setItem(queryParameter+"Uuid"+resource,display)
                        }
                    }
                }
            }
        });
    }