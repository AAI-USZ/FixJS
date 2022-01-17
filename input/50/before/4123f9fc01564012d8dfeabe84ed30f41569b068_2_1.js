function(index,value) {
            if(value[0]=='t') {
                mappedarray[encodeURI(tokencurrentarray[index-1].substring(2))] = value.substring(2);
            }
        }