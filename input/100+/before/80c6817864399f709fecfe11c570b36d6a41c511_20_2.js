function(_super) {

    __extends(ReadSdmxPipe, _super);

    ReadSdmxPipe.name = 'ReadSdmxPipe';

    function ReadSdmxPipe(log) {
      this.sequenceNumber = 0;
      ReadSdmxPipe.__super__.constructor.apply(this, arguments);
    }

    ReadSdmxPipe.prototype.bufferToStr = function(data) {
      if (typeof data === 'string') {
        return data;
      } else {
        return data.toString('utf8');
      }
    };

    ReadSdmxPipe.prototype.emitSDMX = function(type, artefact) {
      this.sequenceNumber += 1;
      return this.emitData({
        type: type,
        sequenceNumber: this.sequenceNumber,
        data: artefact
      });
    };

    return ReadSdmxPipe;

  }