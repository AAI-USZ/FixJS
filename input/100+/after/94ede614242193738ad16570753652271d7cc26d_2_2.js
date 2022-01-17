function (el) {
        var f, ff, isRequired, hasPattern, invalid = false;
        
        if(el.nodeName.toLowerCase() === "form") {
            f = el.elements;
            
            for(var i = 0,len = f.length;i < len;i++) {
                ff = f[i];
                
                isRequired = !!(ff.attributes["required"]);
                hasPattern = !!(ff.attributes["pattern"]);
                
                if(ff.nodeName.toLowerCase() !== "fieldset" && (isRequired || hasPattern && isRequired)) {
                    checkField(ff);
                    if(!ff.validity.valid && !invalid) {
                        if(isSubmit) { // If it's not a submit event the field shouldn't be focused
                            ff.focus();
                        }
                        invalid = true;
                    }
                }
            }
            return !invalid;
        } else {
            checkField(el);
            return el.validity.valid;
        }
    }