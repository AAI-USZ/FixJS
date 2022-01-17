function(elm, t) {
    var rectsMatched;
    if (rectsMatched =
        G.__isecRects(this.rect(t), elm.rect(t))) {
        if (!opts.pathDriven) return true;
        var cx = this.xdata, ex = elm.xdata;
        var pathOfC = (cx.__cpath || cx.path);
        var pathOfE = (ex.__cpath || ex.path);
        if (!pathOfC && !pathOfE) return rectsMatched;
        else if (pathOfC && pathOfE) {
            return G.__pointsInPath(this.__pathAt(t), elm.__pointsAt(t)) ||
                   G.__pointsInPath(elm.__pathAt(t), this.__pointsAt(t));
        } else if (pathOfC && !pathOfE) {
            var e_rect = elm.rect(t);
            return G.__pointsInRect(this.__pointsAt(t), e_rect) ||
                   G.__pointsInPath(this.__pathAt(t), e_rect);
        } else if (!pathOfC && pathOfE) {
            var с_rect = this.rect(t);
            return G.__pointsInRect(elm.__pointsAt(t), с_rect) ||
                   G.__pointsInPath(elm.__pathAt(t), с_rect);
        }
        return false;
    }
}