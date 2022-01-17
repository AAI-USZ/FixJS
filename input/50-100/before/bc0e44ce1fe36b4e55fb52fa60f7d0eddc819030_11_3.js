function() {
      var args = Array.prototype.slice.call(arguments);

      //add noop so next works correctly...
      args.push(this._noop);

      var len = args.length;
      var i = 0;
      var item;

      for (; i < len; i++) {
        item = args[i];
        if (typeof(item) === 'object') {
          args[i] = this._wrapObject(item);
        }
      }

      this.page.apply(this.page, args);
    }