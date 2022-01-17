function(gtime) {
    var ltime = this.localTime(gtime);
    if (!this.fits(ltime)) return false;
    return this.__callModifiers(Element.ALL_MODIFIERS, ltime);
}