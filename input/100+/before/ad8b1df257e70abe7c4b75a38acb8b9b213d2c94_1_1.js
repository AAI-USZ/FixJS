function Bitmap(loader, source, options) {
    options || (options = {});
    this._loader = loader;

    DisplayObject.call(this);

    if (options.onload) {
      this.on('load', options.onload);
    }
    if (options.onerror) {
      // TODO: choose diff evt name to avoid special 'error' treatment in eventemitter
      this.on('error', options.onerror);
    }

    this.type = 'Bitmap';

    Object.defineProperties(this._attributes, {
      height: data(null, true, true),
      width: data(null, true, true),
      source: accessor(getSource, setSource, true),
      _naturalWidth: data(0, true, true),
      _naturalHeight: data(0, true, true)
    });

    var rendererAttributes = this._renderAttributes;
    rendererAttributes.height = 'height';
    rendererAttributes.width = 'width';
    rendererAttributes.naturalHeight = '_naturalHeight';
    rendererAttributes.naturalWidth = '_naturalWidth';
    rendererAttributes.source = '_source';

    this.attr('source', source);
  }