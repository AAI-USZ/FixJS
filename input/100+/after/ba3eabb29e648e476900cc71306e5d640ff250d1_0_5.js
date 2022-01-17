function(callback) {
    var ret = phantom.createCallback();
    ret.called.connect(function(args) {
        var retVal = callback.apply(this, args);
        ret.returnValue = retVal;
    });
    return ret;
}