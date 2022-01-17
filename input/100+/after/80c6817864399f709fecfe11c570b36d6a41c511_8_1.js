function EdifactParser(seg) {
      this.seg = seg;
      this.ec = this.seg.length;
      this.cc = 1;
      this.ep = this.cp = 0;
    }