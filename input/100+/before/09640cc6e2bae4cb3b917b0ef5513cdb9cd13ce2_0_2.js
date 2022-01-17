function(cancel){
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
        }