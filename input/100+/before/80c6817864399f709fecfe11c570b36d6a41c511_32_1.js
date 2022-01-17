function(_super) {

    __extends(WriteToStringStream, _super);

    WriteToStringStream.name = 'WriteToStringStream';

    function WriteToStringStream(string) {
      this.string = string != null ? string : '';
      this.writable = true;
      this.readable = true;
    }

    WriteToStringStream.prototype.write = function(string) {
      this.string += string;
      this.emit('data', string);
      return true;
    };

    WriteToStringStream.prototype.end = function(string) {
      this.atEnd = true;
      if (string != null) {
        this.string += string;
      }
      this.writable = false;
      return this.emit('end');
    };

    WriteToStringStream.prototype.destroy = function() {
      return this.writable = false;
    };

    return WriteToStringStream;

  }