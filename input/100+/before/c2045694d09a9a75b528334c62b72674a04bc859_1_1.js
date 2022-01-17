function() {
    var clone = this.clone();
    var src_x = this.xdata,
        trg_x = clone.xdata;
    if (src_x.path) trg_x.path = src_x.path.clone();
    //if (src_x.image) trg_x.image = src_x.image.clone();
    if (src_x.text) trg_x.text = src_x.text.clone();
    trg_x.pos = [].concat(src_x.pos);
    trg_x.reg = [].concat(src_x.reg);
    trg_x.lband = [].concat(src_x.lband);
    trg_x.gband = [].concat(src_x.gband);
    trg_x.keys = obj_clone(src_x.keys);
    return clone;
}