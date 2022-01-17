function noConflict(ns){
    // #ifdef debug
    if (typeof ns != "string" || !ns) {
        throw new Error('namespace must be a non-empty string');
    }
    _trace("Settings namespace to '" + ns + "'");
    // #endif
    
    window.easyXDM = _easyXDM;
    namespace = ns;
    if (namespace) {
        IFRAME_PREFIX = IFRAME_PREFIX + "_" + namespace.replace(".", "_") + "_";
    }
    return easyXDM;
}