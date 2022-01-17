function Mu_enumerable(context, val, fn) {
    if (typeof(val) === 'function') {
        val = val.call(context);
    }
    
    if (typeof val === 'undefined') {
        return '';
    }
    
    if (typeof val === 'boolean') {
        return val ? fn(context) : '';
    }

    if (val instanceof Array) {
        var result = '';
        for (var i = 0, len = val.length; i < len; i++) {
            var oproto = insertProto(val[i], context);
            result += fn(val[i]);
            oproto.__proto__ = baseProto;
        }
        return result;
    }
    
    if (typeof val === 'object' && val) {
        var oproto = insertProto(val, context);
        var ret = fn(val);
        oproto.__proto__ = baseProto;
        
        return ret;
    }

    return '';
}