function(message){
        var responseObj = JSON.parse(message.data);
        var requestId = responseObj.requestId;
        
        var response = {responseText: responseObj.response};
        
        var callback = callbackQueue[requestId].callback;
        var scope = callbackQueue[requestId].scope;
        console.info(response);
        callback.apply(scope, [response]);
        
        delete callbackQueue[requestId];
    }