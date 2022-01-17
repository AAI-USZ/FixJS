function(value, element, params) {    
            if (!/Invalid|NaN/.test(Date.parse(value))) {
                //if (Date.parse(value).compareTo(Date.now())>0)
                if (Date.parseExact(value, "dd/MM/yyyy HH:mm").compareTo(Date.parseExact(Date.now().toString("dd/MM/yyyy HH:mm"), "dd/MM/yyyy HH:mm"))>0)
                    return true;
                return false;
            }
            
            return isNaN(value) && isNaN(params) 
            || (parseFloat(value) >= parseFloat(params)); 
        }