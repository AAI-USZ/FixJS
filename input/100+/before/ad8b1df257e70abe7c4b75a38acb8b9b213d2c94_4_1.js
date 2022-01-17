function Video(loader, aRequest, options) {
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