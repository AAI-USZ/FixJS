function (response) {
                for(var i=0;i<JSON.parse(response.responseText).results.length;++i){
                    if(JSON.parse(response.responseText).results[i].display == display){
                        localStorage.setItem(queryParameter+"Uuid"+resource,JSON.parse(response.responseText).results[i].uuid)
                    }
                }
                
                
            }