function Mu_enumerable(context, val, fn) {
    if (typeof(val) === 'function') {
        val = val.call(context);
    }
    
    if (null === val || typeof val === 'undefined') {
        return '';
    }
    
    if (typeof val === 'boolean') {
        return val ? fn(context) : '';
    }

    if (val instanceof Array) {
        var result = '';
        for (var i = 0, len = val.length; i < len; i++) {
            result += Mu.enumerable(context, val[i], fn);
        }
        return result;
    }
    
    if (typeof val === 'object') {
        var oproto = insertProto(val, context);
        var ret = fn(val);
        oproto.__proto__ = baseProto;
        
        return ret;
    }

    return '';
}