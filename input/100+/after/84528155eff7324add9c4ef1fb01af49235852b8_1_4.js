function(opts) {
    var canvas = this.canvas;
    this._canvasConf = opts;
    var _w = opts.width ? Math.floor(opts.width) : DEF_CNVS_WIDTH;
    var _h = opts.height ? Math.floor(opts.height) : DEF_CNVS_HEIGHT;
    opts.width = _w;
    opts.height = _h;
    this.state.width = _w;
    this.state.height = _h;
    if (opts.bgfill) this.state.bgfill = opts.bgfill;
    canvasOpts(canvas, opts);
    if (this.controls) this.controls.update(canvas);
    if (this.info) this.info.update(canvas);
    this._saveCanvasPos(canvas);
    this._checkMode();
    this.__canvasPrepared = true;
    return this;
}