function(pts, t) { // adopt point by current or time-matrix
    if (!pts) return null;
    //if (!Array.isArray(pts)) throw new Error('Wrong point format');
    if ((t != null) &&
        (this.__modifying != null)
        && (this.__modifying !== Element.EVENT_MOD)) {
        throw new Error('Time-related tests may happen only outside of modifier or inside event handler');
    }
    var s = (t == null) ? this.state : this.stateAt(t);
    if (!s._applied) {
        // fill result with min-values
        var l = pts.length; result = new Array(l), i = l;
        while (i--) result[i] = Number.MIN_VALUE;
        return result;
    }
    return this.__adoptWithM(pts, E._getIMatrixOf(s));
}