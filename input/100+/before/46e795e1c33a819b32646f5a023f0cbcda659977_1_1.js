function Sprite(loader, sources, options) {

    Group.call(this);

    this._loader = loader;
    this.options = options;
    this.sources = sources;
    this.currentBitmapIndex = 0;

    if (options.onload) {
      this.on('load', options.onload);
    }
    if (options.onerror) {
      // TODO: choose diff evt name to avoid special 'error' treatment in eventemitter
      this.on('error', options.onerror);
    }

    Object.defineProperties(this._attributes, {
      height: data(0, true, true),
      width: data(0, true, true)
    });

    this._load();
  }