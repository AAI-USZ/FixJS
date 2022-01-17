function(elm, func) {
    if (!this._collisionTests) this._collisionTests = [];
    if (!this._collisionElms) this._collisionElms = [];
    this._collisionTests.push(func);
    this._collisionElms.push(elm);
}