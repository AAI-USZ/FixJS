function EdifactLexer(callback) {
      this.callback = callback;
      this.segmentCount = 0;
      this.segment = [[]];
      this.string = [];
      this.elementPos = this.componentPos = this.pos = this.segmentCount = 0;
    }