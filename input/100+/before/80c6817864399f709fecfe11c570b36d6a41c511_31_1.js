function(_super) {

    __extends(WriteToArrayStream, _super);

    WriteToArrayStream.name = 'WriteToArrayStream';

    function WriteToArrayStream(items) {
      this.items = items != null ? items : [];
      this.writable = true;
    }

    WriteToArrayStream.prototype.write = function(data) {
      this.items.push(data);
      this.emit('data', data);
      return true;
    };

    WriteToArrayStream.prototype.end = function(data) {
      if (data != null) {
        this.items.push(data);
      }
      this.writable = false;
      return this.emit('end', data);
    };

    return WriteToArrayStream;

  }