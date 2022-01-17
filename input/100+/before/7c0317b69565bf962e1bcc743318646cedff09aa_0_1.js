function Builder(obj) {
    if (!obj) {
        this.n = '';
        this.v = new Element();
        this.x = this.v.xdata;
    } else if (obj instanceof Builder) {
        this.n = obj.n;
        this.v = obj.v.dclone();
        this.x = this.v.xdata;
        this.f = this._extractFill(obj.f);
        this.s = this._extractStroke(obj.s);
        return; // all done
    } else if (obj instanceof Element) {
        this.n = obj.name;
        this.v = obj;
        this.x = obj.xdata;
    } else if (typeof obj === 'string') {
        this.n = obj;
        this.v = new Element();
        this.v.name = this.n;
        this.x = this.v.xdata;
    }
    this.f = this._extractFill(Builder.DEFAULT_FILL);
    this.s = this._extractStroke(Builder.DEFAULT_STROKE);
}