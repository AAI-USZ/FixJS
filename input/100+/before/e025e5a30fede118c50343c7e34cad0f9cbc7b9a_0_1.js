function endRule(){
            var prop;
            if (properties.height){
                for (prop in heightProperties){
                    if (heightProperties.hasOwnProperty(prop) && properties[prop]){
                    
                        //special case for padding
                        if (!(prop == "padding" && properties[prop].value.parts.length === 2 && properties[prop].value.parts[0].value === 0)){
                            reporter.report("Using height with " + prop + " can sometimes make elements larger than you expect.", properties[prop].line, properties[prop].col, rule);
                        }
                    }
                }
            }

            if (properties.width){
                for (prop in widthProperties){
                    if (widthProperties.hasOwnProperty(prop) && properties[prop]){

                        if (!(prop == "padding" && properties[prop].value.parts.length === 2 && properties[prop].value.parts[1].value === 0)){
                            reporter.report("Using width with " + prop + " can sometimes make elements larger than you expect.", properties[prop].line, properties[prop].col, rule);
                        }
                    }
                }
            }        
        }