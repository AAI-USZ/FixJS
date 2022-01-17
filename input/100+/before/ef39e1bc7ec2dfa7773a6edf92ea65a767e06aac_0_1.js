function(){
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
                }else readyFn();
            }