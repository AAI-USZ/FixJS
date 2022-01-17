function(_super) {

    __extends(DebugPipe, _super);

    DebugPipe.name = 'DebugPipe';

    function DebugPipe(log) {
      DebugPipe.__super__.constructor.apply(this, arguments);
    }

    DebugPipe.prototype.processData = function(sdmxdata) {
      console.log(util.inspect(sdmxdata, true, null, false));
      return DebugPipe.__super__.processData.apply(this, arguments);
    };

    return DebugPipe;

  }