function WriteXmlPipe(log) {
      this.header = {};
      this.rootElemName = '';
      this.doc = builder.create();
      WriteXmlPipe.__super__.constructor.apply(this, arguments);
    }