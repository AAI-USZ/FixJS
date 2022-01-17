function(_super) {

    __extends(ReadEdifactPipe, _super);

    ReadEdifactPipe.name = 'ReadEdifactPipe';

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

    ReadEdifactPipe.prototype.processData = function(data) {
      return this.lexer.tokenize(data);
    };

    ReadEdifactPipe.prototype.onSegment = function(seg) {
      var parser, path, tagName;
      parser = new EdifactParser(seg);
      tagName = parser.tag();
      this.segmentCount += 1;
      this.pathStack.push(tagName);
      path = this.pathStack.join('/');
      if (actions.fst[path]) {
        if (actions.guards[path] != null) {
          actions.guards[path].call(this, parser);
        }
        if (actions.entryActions[path] != null) {
          actions.entryActions[path].call(this, parser, {});
        }
        return;
      }
      while (1 < this.pathStack.length) {
        this.pathStack.pop();
        path = this.pathStack.join('/');
        if (actions.exitActions[path] != null) {
          actions.exitActions[path].call(this, {});
        }
        this.pathStack.pop();
        this.pathStack.push(tagName);
        path = this.pathStack.join('/');
        if (actions.fst[path]) {
          if (actions.guards[path] != null) {
            actions.guards[path].call(this, parser);
          }
          if (actions.entryActions[path] != null) {
            actions.entryActions[path].call(this, parser, {});
          }
          return;
        }
      }
      return this.log.error("Invalid tag " + tagName + " in segment " + seg);
    };

    return ReadEdifactPipe;

  }