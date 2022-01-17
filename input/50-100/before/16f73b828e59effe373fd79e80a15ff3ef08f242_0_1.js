function swap(ele, options, callback){
        var defaultVal = {},
            result;
        for(var i in options){
            defaultVal[i] = ele.style[i];
            ele.style[i] = options[i];
        }
        result = callback.call(ele);
        for(var i in options){
            ele.style[i] = defaultVal[i];
        }
        return result;
    }