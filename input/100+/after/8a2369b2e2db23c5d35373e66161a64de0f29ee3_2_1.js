function (response) {
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