function(_super) {

    __extends(GenSym, _super);

    GenSym.prototype.className = 'GenSym';

    function GenSym(data, ns) {
      this.data = data;
      this.ns = ns != null ? ns : '';
    }

    return GenSym;

  }