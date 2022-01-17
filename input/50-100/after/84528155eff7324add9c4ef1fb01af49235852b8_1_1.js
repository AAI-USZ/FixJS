function Player(id, opts) {
    this.id = id;
    this.state = null;
    this.anim = null;
    this.canvas = null;
    this.ctx = null;
    this.controls = null;
    this.info = null;
    this.__canvasPrepared = false;
    this.__instanceNum = ++Player.__instances;
    this._init(opts);
}