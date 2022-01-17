function Video(loader, aRequest, callback, options) {
    options || (options = {});
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

    this.type = 'Video';

    Object.defineProperties(this._attributes, {
      height: data(options.height, true, true),
      width: data(options.width, true, true),
      autoplay: data(options.autoplay || false, true, true)
    });

    var rendererAttributes = this._renderAttributes;
    rendererAttributes.height = 'height';
    rendererAttributes.width = 'width';
    rendererAttributes.autoplay = 'autoplay';

    this.request(aRequest);
  }