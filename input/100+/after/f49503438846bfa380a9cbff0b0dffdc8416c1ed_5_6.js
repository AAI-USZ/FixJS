function ByteArrayClass(runtime, scope, instance, baseClass) {
    /* The initial size of the backing, in bytes. Doubled every OOM. */
    const INITIAL_SIZE = 128;

    function ByteArray() {
      var a = new ArrayBuffer(INITIAL_SIZE);
      this.a = a;
      this.length = 0;
      this.position = 0;
      this.cacheViews();
      this.nativele = new Int8Array(new Int32Array([]).buffer)[0] === 1;
      this.le = this.nativele;
    }

    function throwEOFError() {
      runtime.throwErrorFromVM("flash.errors.EOFError", "End of file was encountered.");
    }

    function get(b, m, size) {
      if (b.position + size > b.length) {
        throwEOFError();
      }
      var v = b.view[m](b.position, b.le);
      b.position += size;
      return v;
    }

    function set(b, m, size, v) {
      var len = b.position + size;
      b.ensureCapacity(len);
      b.view[m](b.position, v, b.le);
      b.position = len;
      if (len > b.length) {
        b.length = len;
      }
    }

    var c = new runtime.domain.system.Class("ByteArray", ByteArray, C(ByteArray));

    var m = ByteArray.prototype;

    m.cacheViews = function cacheViews() {
      var a = this.a;
      this.int8v  = new Int8Array(a);
      this.uint8v = new Uint8Array(a);
      this.view   = new DataView(a);
    };

    m.ensureCapacity = function ensureCapacity(size) {
      var origa = this.a;
      if (origa.byteLength < size) {
        var newSize = origa.byteLength;
        while (newSize < size) {
          newSize *= 2;
        }
        var copya = new ArrayBuffer(newSize);
        var origv = this.int8v;
        this.a = copya;
        this.cacheViews();
        this.int8v.set(origv);
      }
    };

    m.clear = function clear() {
      this.length = 0;
      this.position = 0;
    };

    /**
     * For byte-sized reads and writes we can just go through the |Uint8Array| and not
     * the slower DataView.
     */
    m.readBoolean = function readBoolean() {
      if (this.position + 1 > this.length) {
        throwEOFError();
      }
      return this.int8v[this.position++] !== 0;
    };

    m.readByte = function readByte() {
      if (this.position + 1 > this.length) {
        throwEOFError();
      }
      return this.int8v[this.position++];
    };

    m.readUnsignedByte = function readUnsignedByte() {
      if (this.position + 1 > this.length) {
        throwEOFError();
      }
      return this.uint8v[this.position++];
    };

    m.readBytes = function readBytes(bytes, offset, length) {
      var pos = this.position;
      if (pos + length > this.length) {
        throwEOFError();
      }
      bytes.int8v.set(new Int8Array(this.a, pos, length), offset);
      this.position += length;
    };

    m.writeBoolean = function writeBoolean(v) {
      var len = this.position + 1;
      this.ensureCapacity(len);
      this.int8v[this.position++] = !!v ? 1 : 0;
      if (len > this.length) {
        this.length = len;
      }
    };

    m.writeByte = function writeByte(v) {
      var len = this.position + 1;
      this.ensureCapacity(len);
      this.int8v[this.position++] = v;
      if (len > this.length) {
        this.length = len;
      }
    };

    m.writeUnsignedByte = function writeByte(v) {
      var len = this.position + 1;
      this.ensureCapacity(len);
      this.uint8v[this.position++] = v;
      if (len > this.length) {
        this.length = len;
      }
    };

    m.writeRawBytes = function writeRawBytes(bytes) {
      var len = this.position + bytes.length;
      this.ensureCapacity(len);
      this.int8v.set(bytes, this.position);
      this.position = len;
      if (len > this.length) {
        this.length = len;
      }
    };

    m.writeBytes = function writeBytes(bytes, offset, length) {
      if (offset && length) {
        this.writeRawBytes(new Int8Array(bytes.a, offset, length));
      } else {
        this.writeRawBytes(bytes.int8v);
      }
    };

    m.readDouble = function readDouble() { return get(this, 'getFloat64', 8); };
    m.readFloat = function readFloat() { return get(this, 'getFloat32', 4); };
    m.readInt = function readInt() { return get(this, 'getInt32', 4); };
    m.readShort = function readShort() { return get(this, 'getInt16', 2); };
    m.readUnsignedInt = function readUnsignedInt() { return get(this, 'getUint32', 4); };
    m.readUnsignedShort = function readUnsignedShort() { return get(this, 'getUint16', 2); };

    m.writeDouble = function writeDouble(v) { set(this, 'setFloat64', 8, v); };
    m.writeFloat = function writeFloat(v) { set(this, 'setFloat32', 4, v); };
    m.writeInt = function writeInt(v) { set(this, 'setInt32', 4, v); };
    m.writeShort = function writeShort(v) { set(this, 'setInt16', 2, v); };
    m.writeUnsignedInt = function writeUnsignedInt(v) { set(this, 'setUint32', 4, v); };
    m.writeUnsignedShort = function writeUnsignedShort(v) { set(this, 'setUint16', 2, v); };

    m.readUTF = function readUTF() {
      return this.readUTFBytes(this.readShort());
    };

    m.readUTFBytes = function readUTFBytes(length) {
      var pos = this.position;
      if (pos + length > this.length) {
        throwEOFError();
      }
      this.position += length;
      return utf8encode(new Int8Array(this.a, pos, length));
    };

    m.writeUTF = function writeUTF(str) {
      var bytes = utf8decode(str);
      this.writeShort(bytes.length);
      this.writeRawBytes(bytes);
    };

    m.writeUTFBytes = function writeUTFBytes(str) {
      var bytes = utf8decode(str);
      this.writeRawBytes(bytes);
    };

    m.toString = function toString() {
      return utf8encode(new Int8Array(this.a, 0, this.length));
    };

    defineNonEnumerableProperty(m, "get length", function () { return this.length; });
    defineNonEnumerableProperty(m, "set length", function setLength(length) {
      var cap = this.a.byteLength;
      /* XXX: Do we need to zero the difference if length <= cap? */
      if (length > cap) {
        this.ensureSize(length);
      }
      this.length = length;
    });
    defineNonEnumerableProperty(m, "get bytesAvailable", function () { return this.a.byteLength - this.position; });
    defineNonEnumerableProperty(m, "get position", function () { return this.position; });
    defineNonEnumerableProperty(m, "set position", function (p) { this.position = p; });
    defineNonEnumerableProperty(m, "get endian", function () { return this.le ? "littleEndian" : "bigEndian"; });
    defineNonEnumerableProperty(m, "set endian", function (e) { this.le = e === "littleEndian"; });

    c.nativeMethods = m;

    return c;
  }