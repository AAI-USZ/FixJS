function send(callback) {
      var header, xhr;

      if (typeof(callback) === 'undefined') {
        callback = this.callback;
      }

      if (this.globalXhrOptions) {
        xhr = new this.xhrClass(this.globalXhrOptions);
      } else {
        xhr = new this.xhrClass();
      }

      this.xhr = xhr;

      if (Xhr.authHack) {
        xhr.open(this.method, this.url, this.async);
      } else {
        xhr.open(this.method, this.url, this.async, this.user, this.password);
      }

      for (header in this.headers) {
        if (this.headers.hasOwnProperty(header)) {
          xhr.setRequestHeader(header, this.headers[header]);
        }
      }


      xhr.onreadystatechange = function onReadyStateChange() {
        var data;
        if (xhr.readyState === 4) {
          data = xhr.responseText;
          this.waiting = false;
          callback(null, xhr);
        }
      }.bind(this);

      this.waiting = true;
      xhr.send(this._seralize());
    }