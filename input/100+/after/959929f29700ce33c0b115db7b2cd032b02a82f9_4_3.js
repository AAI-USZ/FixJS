function(arr, form, options){
            var _arr = arr;
            $(myOptions.beforeSubmitCallbackFunctions).each(function(i,item){
                if(typeof(item) === 'function') item(_arr);
            });
        }