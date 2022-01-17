function(config) {
    this._config = extend(defaults, config);

    this._stream = null;

    this._photos = [];

    this._container = this._config.container;

    // dimensions of container element
    var width = this._container.clientWidth;
    var height = this._container.clientHeight;

    // if imgWidth and imgHeight weren't explicitly set,
    // inherit values from the dimensions of the container
    this._config.imgWidth || (this._config.imgWidth = width);
    this._config.imgHeight || (this._config.imgHeight = height);

    // video element is where the webcam stream
    // gets piped to for the live preview
    this._video = document.createElement('video');
    this._video.width = width;
    this._video.height = height;
    this._video.autoplay = true;
    this._container.appendChild(this._video);

    // canvas element is used to capture images
    this._canvas = document.createElement('canvas');
    this._canvas.width = this._config.imgWidth;
    this._canvas.height = this._config.imgHeight;

    this._context = this._canvas.getContext('2d');
  }