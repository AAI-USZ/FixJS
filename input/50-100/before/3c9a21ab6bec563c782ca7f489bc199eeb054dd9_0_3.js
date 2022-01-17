function(obj, secondary, key, lambda, error_lambda)
    {
         var params = null

         console.log(key);
        _staticApi.call(('get/' + obj + "by" + secondary + "/" + key), params, function(data){
            Log('debug', 'response data:', data);
            lambda(data);
        }, error_lambda)
    }