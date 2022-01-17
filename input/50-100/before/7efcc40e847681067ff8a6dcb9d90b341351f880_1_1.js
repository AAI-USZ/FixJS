function() {
    var clone = new Element();
    clone.name = this.name;
    clone.children = this.children.slice(0);
    clone.sprite = this.sprite;
    clone._modifiers = this._modifiers.slice(0);
    clone._painters = this._painters.slice(0);
    clone.xdata = obj_clone(this.xdata);
    clone.xdata.$ = clone;
    return clone;
}