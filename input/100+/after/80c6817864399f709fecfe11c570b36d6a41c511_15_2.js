function WriteAtomPipe(log) {
      this.log = log;
      this.doc = xmlbuilder.create();
      WriteAtomPipe.__super__.constructor.call(this, this.log);
    }