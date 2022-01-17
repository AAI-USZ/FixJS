function PcAxisParser(log) {
      this.log = log;
      this.keyword = {};
      this["function"] = {};
      this.symbol = NONE;
      this.token = [];
      this.atEnd = false;
      this.parser = this.parseMetadata;
      this.dataArrayMaxLength = 1;
      this.dataArray = [];
    }