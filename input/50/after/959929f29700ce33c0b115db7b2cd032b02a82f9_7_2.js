function(url, data, callback){
             KYT.showThrob=true;
            $.get(url,data,function(result){repositoryCallback(result,callback);
            });
        }