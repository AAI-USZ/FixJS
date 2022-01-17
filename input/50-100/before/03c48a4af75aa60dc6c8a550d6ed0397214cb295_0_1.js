function Mu_normalize(context, name) {
    var val = context[name];
    
    if (typeof val === 'function') {
        val = val.call(context);
    }
    
    return typeof val === 'undefined' ? '' : val.toString();
}