function() {

    var me = this,
        sources = this.sources;

    for (var i = 0, l = sources.length; i < l; ++i) {
      new Bitmap(this._loader, sources[i], function(err, data) {
        if (err) {
          me.emit('error', data);
        } else {
          me._bitmapLoaded(this);
        }
      });
    }
  }