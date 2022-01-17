function(url, data, callback){
             KYT.showThrob=true;
            $.post(url,data,function(result){ repositoryCallback(result,callback)});
        }