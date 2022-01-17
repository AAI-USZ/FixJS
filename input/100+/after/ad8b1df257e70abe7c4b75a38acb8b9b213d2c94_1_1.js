function Bitmap(loader, source, callback) {

    this._loader = loader;

    DisplayObject.call(this);

    if (callback) {
      this.on('load', function() {
        callback.call(this, null);
      });
      this.on('error', function(errorData) {
        callback.call(this, errorData);
      });
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