function(prefix, res) {
    var _this = this,
        suffix = 'bemhtml.js';
    return Q.when(res, function(res) {
        return _this.storeBuildResult(_this.getPath(prefix, suffix), suffix, res['bemhtml']);
    });
}