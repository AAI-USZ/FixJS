function(index,value) {
            if(value[0]=='t') {
                anewcurrentarray[$("#td_"+value).val()] = value.substring(2);
            }
        }