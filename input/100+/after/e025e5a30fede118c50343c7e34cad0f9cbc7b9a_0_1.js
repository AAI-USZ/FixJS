function endRule(){
            var prop, value;
            if (properties.height){
                for (prop in heightProperties){
                    if (heightProperties.hasOwnProperty(prop) && properties[prop]){
                        value = properties[prop].value;
                        //special case for padding
                        if (!(prop == "padding" && value.parts.length === 2 && value.parts[0].value === 0)){
                            reporter.report("Using height with " + prop + " can sometimes make elements larger than you expect.", properties[prop].line, properties[prop].col, rule);
                        }
                    }
                }
            }

            if (properties.width){
                for (prop in widthProperties){
                    if (widthProperties.hasOwnProperty(prop) && properties[prop]){
                        value = properties[prop].value;
                        
                        if (!(prop == "padding" && value.parts.length === 2 && value.parts[1].value === 0)){
                            reporter.report("Using width with " + prop + " can sometimes make elements larger than you expect.", properties[prop].line, properties[prop].col, rule);
                        }
                    }
                }
            }        
        }