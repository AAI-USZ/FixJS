function() {

    var sources = this.sources;

    for (var i = 0, l = sources.length; i < l; ++i) {
      new Bitmap(this._loader, sources[i], {
        onload: tools.hitch(this, '_bitmapLoaded')
      });
    }
  }