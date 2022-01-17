function(value, element, params) {    
            if (!/Invalid|NaN/.test(Date.parse(value))) {
                if (Date.parse(value).compareTo(Date.now())>0)
                    return true;
                return false;
            }
            
            return isNaN(value) && isNaN(params) 
            || (parseFloat(value) >= parseFloat(params)); 
        }