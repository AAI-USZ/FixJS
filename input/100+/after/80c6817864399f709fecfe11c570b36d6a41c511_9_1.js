function ReadEdifactPipe(log, stream) {
      this.onSegment = __bind(this.onSegment, this);

      this.processData = __bind(this.processData, this);
      this.lexer = new EdifactLexer(this.onSegment);
      this.stream = {};
      this.pathStack = [];
      this.path = '';
      this.segmentCount = 0;
      this.messageCount = 0;
      this.tooManyErrors = false;
      this.helper = {};
      this.messageBegin = {};
      this.codelist = {};
      this.conceptScheme = {};
      this.dsd = {};
      this.component = {};
      this.dataSetBegin = {};
      this.header = {};
      this.series = {};
      this.attributes = {};
      ReadEdifactPipe.__super__.constructor.apply(this, arguments);
    }