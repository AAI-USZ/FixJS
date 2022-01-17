function(file){
                var pattern = /<!ENTITY\s(.*?)[\s]+\"(.*?)\"[\s]*>/g;
                var URL = file;
                var req = new XMLHttpRequest();
                req.overrideMimeType('text/plain');
                req.open('GET', URL, false); 
                req.send(null);
                if(req.status == 0){
                        var result;
                        while(result = pattern.exec(req.responseText)){
                                strings.values[result[1]] = result[2];
                        }
                }
        }