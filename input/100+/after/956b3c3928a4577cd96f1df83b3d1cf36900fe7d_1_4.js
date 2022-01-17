function (queryable, callBack) {
        var query = new $data.Query(queryable.expression, queryable.defaultType, this);
        callBack = $data.typeSystem.createCallbackSetting(callBack);
        var that = this;
        var clbWrapper = {};
        clbWrapper.success = function (query) {
            query.buildResultSet(that);
            var successResult;
            
            if (query.expression.nodeType === $data.Expressions.ExpressionType.Single ||
                query.expression.nodeType === $data.Expressions.ExpressionType.Count ||
                query.expression.nodeType === $data.Expressions.ExpressionType.Some ||
                query.expression.nodeType === $data.Expressions.ExpressionType.Every) {
                if (query.result.length !== 1) {
                    callBack.error(new Exception('result count failed'));
                    return;
                }

                successResult = query.result[0];
            } else if (query.expression.nodeType === $data.Expressions.ExpressionType.First) {
                if (query.result.length === 0) {
                    callBack.error(new Exception('result count failed'));
                    return;
                }

                successResult = query.result[0];
            } else {
                successResult = query.result;
            }
            
            var readyFn = function(){
                callBack.success(successResult);
            };
            
            var i = 0;
            var callbackFn = function(){
                var es = sets[i];
                if (es.afterRead){
                    i++;
                    var r = es.afterRead.call(this, successResult, sets, query);
                    if (typeof r === 'function'){
                        r.call(this, i < sets.length ? callbackFn : readyFn, successResult, sets, query);
                    }else{
                        if (i < sets.length){
                            callbackFn();
                        }else readyFn();
                    }
                }
            }
            
            callbackFn();
        };
        
        clbWrapper.error = callBack.error;
        var sets = query.getEntitySets();
        
        var ex = true;
        var wait = false;
        var ctx = this;
        
        var readyFn = function(cancel){
            if (cancel === false) ex = false;
            
            if (ex) ctx.storageProvider.executeQuery(query, clbWrapper);
            else{
                query.rawDataList = [];
                query.result = [];
                clbWrapper.success(query);
            }
        };
        
        var i = 0;
        var callbackFn = function(cancel){
            if (cancel === false) ex = false;
            
            var es = sets[i];
            if (es.beforeRead){
                i++;
                var r = es.beforeRead.call(this, sets, query);
                if (typeof r === 'function'){
                    r.call(this, (i < sets.length && ex) ? callbackFn : readyFn, sets, query);
                }else{
                    if (r === false) ex = false;
                    
                    if (i < sets.length && ex){
                        callbackFn();
                    }else readyFn();
                }
            }
        };
        
        callbackFn();
    }