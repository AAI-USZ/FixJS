function(value){
                    var timezone = undefined;
                    if(value.indexOf("+") !=-1){
                        timezone = value.substring(value.indexOf("+"),value.length);
                        if(timezone.indexOf(":")!=-1){
                            timezone = timezone.replace(":","");
                        }
                    }
                    var zulu = (value.indexOf("Z") !=-1);
                    if(timezone == undefined && !zulu){
                        value = value + "Z";
                    }
                    var date = new Date(value);
                    return date.toISOString();
                }