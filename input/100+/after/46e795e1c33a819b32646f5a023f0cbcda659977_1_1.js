function Sprite(loader, sources, callback) {

    Group.call(this);

    this._loader = loader;
    this.sources = sources;
    this.currentBitmapIndex = 0;

    if (callback) {
      this.bindAssetCallback(callback);
    }

    Object.defineProperties(this._attributes, {
      height: data(0, true, true),
      width: data(0, true, true)
    });

    this._load();
  }