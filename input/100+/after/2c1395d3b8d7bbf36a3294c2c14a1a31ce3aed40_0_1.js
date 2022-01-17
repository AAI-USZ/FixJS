function(len) {
    len = len || this.read_ber();

    function arraybuffer2buffer(buf) {
      console.assert(Buffer.isBuffer(buf));

      var ret = new Buffer(buf.length);
      var ary = new Uint8Array(ret);
      for(var i = 0; i < buf.length; ++i) {
        ret[i] = ary[i]
      }
      return ret;
    }

    var ret;
    if(Buffer && __filename && __dirname) {
      if(!Converter) {
        var Iconv = require('iconv').Iconv;
        Converter = new Iconv('shift_jis', 'UTF-8//TRANSLIT//IGNORE');
      }
      ret = Converter.convert(arraybuffer2buffer(this.slice(len))).toString('utf-8');
    } else {
      ret = Encoding.convert(this.slice(len), 'UTF8', 'SJIS');
    }

    this.position += len;
    return ret;
  }