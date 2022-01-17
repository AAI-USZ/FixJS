function(_super) {

    __extends(WriteSdmxPipe, _super);

    WriteSdmxPipe.name = 'WriteSdmxPipe';

    function WriteSdmxPipe(log) {
      this.previous = '';
      WriteSdmxPipe.__super__.constructor.apply(this, arguments);
    }

    WriteSdmxPipe.prototype.processData = function(sdmxdata) {
      var current, data, str;
      this.log.debug("" + this.constructor.name + " processData");
      current = sdmxdata.type;
      data = sdmxdata.data;
      str = '';
      if (this.previous === current) {
        str += this.beforeNext(current);
      } else {
        str += this.afterLast(this.previous);
        str += this.beforeFirst(current, data);
      }
      str += this.before(current, data);
      str += this.stringify(current, data);
      this.previous = current;
      return this.emitData(str);
    };

    WriteSdmxPipe.prototype.processEnd = function() {
      var current, str;
      this.log.debug("" + this.constructor.name + " processEnd");
      current = 'end';
      str = '';
      if (this.previous === current) {
        str += this.beforeNext('end');
      } else {
        str += this.afterLast(this.previous);
        str += this.beforeFirst(current);
      }
      this.previous = current;
      return this.emitData(str);
    };

    WriteSdmxPipe.prototype.before = function(event, data) {
      return '';
    };

    WriteSdmxPipe.prototype.beforeNext = function(event) {
      return '';
    };

    WriteSdmxPipe.prototype.beforeFirst = function(event, data) {
      return '';
    };

    WriteSdmxPipe.prototype.stringify = function(event, data) {
      return '';
    };

    WriteSdmxPipe.prototype.afterLast = function(event) {
      return '';
    };

    return WriteSdmxPipe;

  }