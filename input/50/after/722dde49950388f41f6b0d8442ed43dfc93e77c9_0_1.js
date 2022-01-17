function(index,value) {
            if(value[0]=='t') {
                anewcurrentarray[value.substring(2)] = $("#td_"+value).val();
            }
        }