function(pt, src) {
    this.x.pos = pt;
    if (src) {
        var b = this;
        this.x.image = 
           // width/height olny will be known when image will be loaded
           Element.imgFromUrl(src, function(img) {
                b.__modify(Element.SYS_MOD, function(t) {
                    this.rx = Math.floor(img.width/2);
                    this.ry = Math.floor(img.height/2);
                });
           });
    }
    return this;
}