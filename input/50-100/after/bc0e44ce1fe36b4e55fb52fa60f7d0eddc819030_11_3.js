function() {
      var args = Array.prototype.slice.call(arguments);

      //add noop so next works correctly...
      args.push(this._noop);

      var len = args.length;
      var i = 0;
      var item;

      this.page.apply(this.page, args);
    }