function() {
    var layout = this.get('layout'), pdim = null,
        translateTop = null,
        translateLeft = null,
        turbo = this.get('turbo'),
        ret = this.ret,
        dims = this.dims,
        loc = this.loc,
        view = this.get('view'),
        key, value;

    this._handleMistakes(layout);


    // X DIRECTION

    if (this.hasLeft || this.hasRight || !this.hasCenterX) {
      translateLeft = this._calculatePosition("x");
    } else {
      this._calculateCenter("x");
    }


    // Y DIRECTION

    if (this.hasTop || this.hasBottom || !this.hasCenterY) {
      translateTop = this._calculatePosition("y");
    } else {
      this._calculateCenter("y");
    }


    // these properties pass through unaltered (after prior normalization)
    ret.minWidth   = this.minWidth;
    ret.maxWidth   = this.maxWidth;
    ret.minHeight  = this.minHeight;
    ret.maxHeight  = this.maxHeight;

    ret.zIndex     = this.zIndex;
    ret.opacity    = this.opacity;
    ret.mozOpacity = this.opacity;

    ret.backgroundPosition = this.backgroundPosition;

    this._calculateTransforms(translateLeft, translateTop);
    this._calculateAnimations(translateLeft, translateTop);


    // convert any numbers into a number + "px".
    for(key in ret) {
      value = ret[key];
      if (typeof value === SC.T_NUMBER) { ret[key] = (value + "px"); }
    }

    return ret ;
  }