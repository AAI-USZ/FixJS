function ReadXmlPipe(log, startDepth) {
      this.startDepth = startDepth != null ? startDepth : 0;
      this.onerror = __bind(this.onerror, this);

      this.ontext = __bind(this.ontext, this);

      this.onclosetag = __bind(this.onclosetag, this);

      this.onopentag = __bind(this.onopentag, this);

      this.processData = __bind(this.processData, this);

      this.spec = {};
      this.stringBuffer = '';
      this.fst = {};
      this.entryActions = {};
      this.exitActions = {};
      this.guards = {};
      this.elementCount = 0;
      this.pathStack = [];
      this.attrsStack = [];
      this.path = '';
      this.fullPath = '';
      this.rootTag = '';
      this.parser = sax.parser(true, {
        trim: true,
        normalize: true
      });
      this.parser.onopentag = this.onopentag;
      this.parser.onclosetag = this.onclosetag;
      this.parser.ontext = this.ontext;
      this.parser.onerror = this.onerror;
      ReadXmlPipe.__super__.constructor.apply(this, arguments);
    }