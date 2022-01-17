    get decoder() {
      var decoder = new ArithmeticDecoder(this.data, this.start, this.end);
      return shadow(this, 'decoder', decoder);
    },
