function(data){
        console.log('reflash data!');
        for(var n= 0 ; n <data.length;n++){
            if(n==Role.id-1){
                console.log(~~data[n]);
            }
            if(!!data[n]){jumpWood(n,~~data[n]);}
        }
    }