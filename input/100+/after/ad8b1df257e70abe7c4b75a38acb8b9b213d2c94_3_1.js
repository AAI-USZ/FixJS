function Movie(root, url, callback) {
    DisplayObject.call(this);

    if (callback) {
      this.on('load', function() {
        callback.call(this, null, this);
      });
      this.on('error', function(errorData) {
        callback.call(this, errorData, this);
      });
    }

    this.root = root;
    this._children = [];
    var me = this;
    if (url) {
      root.loadSubMovie(url, function(err) {
        // We trigger the event asynchronously so as to ensure that any events
        // bound after instantiation are still triggered:
        if (err) {
          me.asyncEmit('error', err, me);
        } else {
          me.asyncEmit('load', me);
        }
      }, this);
    }
  }