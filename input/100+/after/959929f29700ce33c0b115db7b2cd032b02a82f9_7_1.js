function(){
    var repositoryCallback = function(result,callback){
        if(result.LoggedOut){
            window.location.replace(result.RedirectUrl);
            return;
        }
        callback(result);
    };
    return {
        ajaxPost:function(url, data, callback){
             KYT.showThrob=true;
            $.post(url,data,function(result){ repositoryCallback(result,callback)});
        },
        ajaxGet:function(url, data, callback){
             KYT.showThrob=true;
            $.get(url,data,function(result){repositoryCallback(result,callback);
            });
        }
    }
}