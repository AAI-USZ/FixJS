function(tx, ty, opt_tz) {

    var p = 1 / this.precision;
    var val = 'translate';

    if (this.enable3D_ && (lime.userAgent.IOS || lime.userAgent.PLAYBOOK)) {
        val += '3d';
    }
    val += '(' + (tx * p) + 'px,' + (ty * p) + 'px';
    if (this.enable3D_ && (lime.userAgent.IOS || lime.userAgent.PLAYBOOK)) {
        val += ',' + ((opt_tz ? opt_tz : 0) * p) + 'px';
    }
    this.values.push(val + ')');
    
    return this;
}