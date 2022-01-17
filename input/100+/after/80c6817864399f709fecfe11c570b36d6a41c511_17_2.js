function ReadPcAxisPipe(log) {
      this.onDataValue = __bind(this.onDataValue, this);

      this.onData = __bind(this.onData, this);

      this.onKeyword = __bind(this.onKeyword, this);
      this.parser = new PcAxisParser(log);
      this.parser.onKeyword = this.onKeyword;
      this.parser.onData = this.onData;
      this.parser.onDataValue = this.onDataValue;
      this.keywords = {};
      this.variables = {};
      this.dimensions = [];
      this.obsDimension = {};
      this.dataSetId = '';
      this.agencyId = '';
      this.lang = 'en';
      this.dataCount = 0;
      ReadPcAxisPipe.__super__.constructor.apply(this, arguments);
    }