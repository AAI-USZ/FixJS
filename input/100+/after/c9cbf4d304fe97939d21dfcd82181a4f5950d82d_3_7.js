function(value){
                    var timezone = undefined;
                    if(value.indexOf("+") !=-1){
                        timezone = value.substring(value.indexOf("+"),value.length);
                        if(timezone.indexOf(":")!=-1){
                            timezone = timezone.replace(":","");
                        }
                    }
                    // console.debug("FactoryInput._getISODate: value:",value);
                    var zulu = (value.indexOf("Z") !=-1);
                    if(timezone == undefined && value != undefined && value != "" && !zulu){
                        value = value + "Z";
                    }

                    if(value) {
                        var date = new Date(value);
                        // console.debug("FactoryInput._getISODate: date:",date);
                        return date.toISOString();
                    }else {
                        // console.debug("FactoryInput._getISODate: date is undefined");
                        return "";
                    }
                }