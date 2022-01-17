    get decoder() {
      var decoder = new ArithmeticDecoder(this.data, this.start, this.end);
      Object.defineProperty(this, 'decoder', {
        value: decoder,
        writable: false,
        configurable: true,
        enumerable: true
      });
      return decoder;
    },
