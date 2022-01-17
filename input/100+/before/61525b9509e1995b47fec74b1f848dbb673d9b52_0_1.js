function () {

  const C = Class.passthroughCallable;
  const CC = Class.constructingCallable;

  /**
   * Object.as
   */
  function ObjectClass(scope, instance, baseClass) {
    var c = new Class("Object", Object, C(Object));

    c.nativeMethods = {
      isPrototypeOf: Object.prototype.isPrototypeOf,
      hasOwnProperty: function (name) {
        name = "public$" + name;
        if (this.hasOwnProperty(name)) {
          return true;
        }
        return this.public$constructor.instance.prototype.hasOwnProperty(name);
      },
      propertyIsEnumerable: function (name) {
        return Object.prototype.propertyIsEnumerable.call(this, "public$" + name);
      }
    };
    c.nativeStatics = {
      _setPropertyIsEnumerable: function _setPropertyIsEnumerable(obj, name, isEnum) {
        var prop = "public$" + name;
        var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
        descriptor.enumerable = false;
        Object.defineProperty(obj, prop, descriptor);
      }
    };

    c.defaultValue = null;
    return c;
  }

  /**
   * Boolean.as
   */
  function BooleanClass(scope, instance, baseClass) {
    var c = new Class("Boolean", Boolean, C(Boolean));
    c.baseClass = baseClass;
    c.nativeMethods = Boolean.prototype;
    return c;
  }

  /**
   * Function.as
   */
  function FunctionClass(scope, instance, baseClass) {
    var c = new Class("Function", Function, C(Function));
    c.baseClass = baseClass;

    var m = Function.prototype;
    defineNonEnumerableProperty(m, "get prototype", function () { return this.prototype; });
    defineNonEnumerableProperty(m, "set prototype", function (p) { this.prototype = p; });
    defineNonEnumerableProperty(m, "get length", function () { return this.length; });
    c.nativeMethods = m;
    c.isInstance = function (value) {
      return typeof value === "function";
    };

    return c;
  }

  function MethodClosureClass(scope, instance, baseClass) {
    var c = new Class("MethodClosure", MethodClosure);
    c.extend(baseClass);
    return c;
  }

  /**
   * String.as
   */
  function StringClass(scope, instance, baseClass) {
    var c = new Class("String", String, C(String));
    c.baseClass = baseClass;

    var m = String.prototype;
    defineNonEnumerableProperty(m, "get length", function () { return this.length; });
    c.nativeMethods = m;
    c.nativeStatics = String;
    c.isInstance = function (value) {
      return typeof value === "string";
    };

    return c;
  }

  /**
   * Array.as
   */
  function ArrayClass(scope, instance, baseClass) {
    var c = new Class("Array", Array, C(Array));
    c.baseClass = baseClass;

    var m = Array.prototype;
    defineNonEnumerableProperty(m, "get length", function() { return this.length; });
    defineNonEnumerableProperty(m, "set length", function(l) { this.length = l; });
    c.nativeMethods = m;

    return c;
  }

  /**
   * Vector.as
   */

  /*
  function VectorClass(scope, instance, baseClass) {
    var c = new Class("Vector", null, null);
    c.baseClass = baseClass;
    var m = Array.prototype;
    c.nativeMethods = m;
    return c;
  }
   */

  /**
   * Creates a typed Vector class. It steals the Array object from a new global
   * and overrides its GET/SET ACCESSOR methods to do the appropriate coercions.
   * If the |type| argument is undefined, then it creates the untyped Vector
   * class.
   */
  function createVectorClass(type) {
    var TypedArray = createNewGlobalObject().Array;

    defineReadOnlyProperty(TypedArray.prototype, GET_ACCESSOR, function (i) {
      return this[i];
    });

    if (type) {
      var coerce = type.instance;
      defineReadOnlyProperty(TypedArray.prototype, SET_ACCESSOR, function (i, v) {
        this[i] = coerce(v);
      });
    } else {
      defineReadOnlyProperty(TypedArray.prototype, SET_ACCESSOR, function (i, v) {
        this[i] = v;
      });
    }

    function TypedVector (length, fixed) {
      var array = new TypedArray(length);
      for (var i = 0; i < length; i++) {
        array[i] = type.defaultValue;
      }
      return array;
    }

    TypedVector.prototype = TypedArray.prototype;
    var name = type ? "Vector$" + type.classInfo.instanceInfo.name.name : "Vector";
    var c = new Class(name, TypedVector, C(TypedVector));

    var m = TypedArray.prototype;

    defineNonEnumerableProperty(m, "get fixed", function () { return false; });
    defineNonEnumerableProperty(m, "set fixed", function (v) { });

    defineNonEnumerableProperty(m, "get length", function () { return this.length; });
    defineNonEnumerableProperty(m, "set length", function setLength(length) {
      // TODO: Fill with zeros if we need to.
      this.length = length;
    });

    c.nativeMethods = m;
    c.nativeStatics = {};
    return c;
  }

  function VectorClass(scope, instance, baseClass) {
    return createVectorClass();
  }

  function ObjectVectorClass(scope, instance, baseClass) {
    return createVectorClass(toplevel.getTypeByName(Multiname.fromSimpleName("Object"), true));
  }

  function IntVectorClass(scope, instance, baseClass) {
    return createVectorClass(toplevel.getTypeByName(Multiname.fromSimpleName("int"), true));
  }

  function UIntVectorClass(scope, instance, baseClass) {
    return createVectorClass(toplevel.getTypeByName(Multiname.fromSimpleName("uint"), true));
  }

  function DoubleVectorClass(scope, instance, baseClass) {
    return createVectorClass(toplevel.getTypeByName(Multiname.fromSimpleName("Number"), true));
  }

  /**
   * Number.as
   */
  function NumberClass(scope, instance, baseClass) {
    var c = new Class("Number", Number, C(Number));
    c.baseClass = baseClass;
    c.nativeMethods = Number.prototype;
    c.defaultValue = Number(0);
    c.isInstance = function (value) {
      return typeof value === "number";
    };
    return c;
  }

  function intClass(scope, instance, baseClass) {
    function int(x) {
      return Number(x) | 0;
    }

    var c = new Class("int", int, C(int));
    c.baseClass = baseClass;
    c.defaultValue = 0;
    c.isInstance = function (value) {
      return (value | 0) === value;
    };

    return c;
  }

  function uintClass(scope, instance, baseClass) {
    function uint(x) {
      return Number(x) >>> 0;
    }

    var c = new Class("uint", uint, C(uint));
    c.baseClass = baseClass;
    c.defaultValue = 0;
    c.isInstance = function (value) {
      return (value >>> 0) === value;
    };

    return c;
  }

  /**
   * Math.as
   */
  function MathClass(scope, instance, baseClass) {
    var c = new Class("Math");
    c.baseClass = baseClass;
    c.nativeStatics = Math;
    return c;
  }

  /**
   * Date.as
   */
  function DateClass(scope, instance, baseClass) {
    var c = new Class("Date", Date, C(Date));
    c.baseClass = baseClass;
    c.nativeMethods = Date.prototype;
    c.nativeStatics = Date;
    return c;
  }

  /**
   * Error.as
   */
  function makeErrorClass(name) {
    return function (scope, instance, baseClass) {
      var c = new Class(name, instance, CC(instance));
      c.extend(baseClass);
      c.nativeMethods = {
        getStackTrace: function () {
          return "TODO: geStackTrace";
        }
      };
      c.nativeStatics = {
        getErrorMessage: function() {
          return "TODO: getErrorMessage";
        }
      };
      return c;
    }
  }

  /**
   * RegExp.as
   *
   * AS RegExp adds two new flags:
   *  /s (dotall)   - makes . also match \n
   *  /x (extended) - allows different formatting of regexp
   *
   * TODO: Should we support extended at all? Or even dotall?
   */
  function RegExpClass(scope, instance, baseClass) {
    function ASRegExp(pattern, flags) {
      function stripFlag(flags, c) {
        flags[flags.indexOf(c)] = flags[flags.length - 1];
        return flags.substr(0, flags.length - 1);
      }

      if (flags) {
        var re;
        var extraProps = {};

        if (flags.indexOf("s") >= 0) {
          pattern = pattern.replace(/\./, "(.|\n)");
          flags = stripFlags(flags, "s");
          extraProps.push({ key: "dotall", value: true });
        }

        re = new RegExp(pattern, flags);

        for (var i = 0, j = extraProps.length; i < j; i++) {
          var prop = extraProps[i];
          re[prop.key] = prop.value;
        }

        return re;
      }

      return new RegExp(pattern, flags);
    }
    ASRegExp.prototype = RegExp.prototype;

    var c = new Class("RegExp", ASRegExp, C(ASRegExp));
    c.baseClass = baseClass;

    var m = RegExp.prototype;
    defineNonEnumerableProperty(m, "get global", function () { return this.global; });
    defineNonEnumerableProperty(m, "get source", function () { return this.source; });
    defineNonEnumerableProperty(m, "get ignoreCase", function () { return this.ignoreCase; });
    defineNonEnumerableProperty(m, "get multiline", function () { return this.multiline; });
    defineNonEnumerableProperty(m, "get lastIndex", function () { return this.lastIndex; });
    defineNonEnumerableProperty(m, "set lastIndex", function (i) { this.lastIndex = i; });
    defineNonEnumerableProperty(m, "get dotall", function () { return this.dotall; });
    defineNonEnumerableProperty(m, "get extended", function () { return this.extended; });
    c.nativeMethods = m;

    return c;
  }

  /**
   * Namespace.as
   */
  function NamespaceClass(scope, instance, baseClass) {
    function ASNamespace(prefixValue, uriValue) {
      if (uriValue === undefined) {
        uriValue = prefixValue;
        prefixValue = undefined;
      }

      // TODO: when uriValue is a QName
      if (prefixValue !== undefined) {
        if (typeof isXMLName === "function") {
          prefixValue = String(prefixValue);
        }

        uriValue = String(uriValue);
      } else if (uriValue !== undefined) {
        if (uriValue.constructor === Namespace) {
          return uriValue.clone();
        }
      }

      /**
       * XXX: Not sure if this is right for whatever E4X bullshit this is used
       * for.
       */
      var ns = Namespace.createNamespace(uriValue);
      ns.prefix = prefixValue;

      return ns;
    }

    var Np = Namespace.prototype;
    ASNamespace.prototype = Np;

    var c = new Class("Namespace", ASNamespace, C(ASNamespace));
    c.baseClass = baseClass;

    c.nativeMethods = {
      "get prefix": Np.getPrefix,
      "get uri": Np.getURI
    };

    return c;
  }

  /**
   * Capabilities.as
   */
  function CapabilitiesClass(scope, instance, baseClass) {
    function Capabilities () {}
    var c = new Class("Capabilities", Capabilities, C(Capabilities));
    c.extend(baseClass);
    c.nativeStatics = {
      "get playerType": function () { return "AVMPlus"; }
    };
    return c;
  }

  function constant(x) {
    return function () {
      return x;
    };
  }

  /**
   * ByteArray.as
   */
  function ByteArrayClass(scope, instance, baseClass) {
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
      throwErrorFromVM("flash.errors.EOFError", "End of file was encountered.");
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

    var c = new Class("ByteArray", ByteArray, C(ByteArray));
    c.extend(baseClass);

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

  function debugBreak(message) {
    // TODO: Set Breakpoint Here
    return message;
  }

  return {
    /**
     * Shell toplevel.
     */
    print: constant(print),
    notImplemented: constant(notImplemented),
    debugBreak: constant(debugBreak),

    original: original,

    /**
     * actionscript.lang.as
     */
    decodeURI: constant(decodeURI),
    decodeURIComponent: constant(decodeURIComponent),
    encodeURI: constant(encodeURI),
    encodeURIComponent: constant(encodeURIComponent),
    isNaN: constant(isNaN),
    isFinite: constant(isFinite),
    parseInt: constant(parseInt),
    parseFloat: constant(parseFloat),
    escape: constant(escape),
    unescape: constant(unescape),
    isXMLName: constant(typeof (isXMLName) !== "undefined" ? isXMLName : function () {
      notImplemented("Chrome doesn't support isXMLName.");
    }),

    /**
     * Unsafes for directly hooking up prototype.
     */
    Function: Function,
    String: String,
    Array: Array,
    Number: Number,
    Boolean: Boolean,
    Math: Math,
    Date: Date,
    RegExp: RegExp,

    /**
     * Classes.
     */
    ObjectClass: ObjectClass,
    Class: constant(Class),
    NamespaceClass: NamespaceClass,
    FunctionClass: FunctionClass,
    MethodClosureClass: MethodClosureClass,
    BooleanClass: BooleanClass,
    StringClass: StringClass,
    NumberClass: NumberClass,
    intClass: intClass,
    uintClass: uintClass,
    ArrayClass: ArrayClass,
    VectorClass: VectorClass,
    ObjectVectorClass: ObjectVectorClass,
    IntVectorClass: IntVectorClass,
    UIntVectorClass: UIntVectorClass,
    DoubleVectorClass: DoubleVectorClass,
    ByteArrayClass: ByteArrayClass,

    ErrorClass: makeErrorClass("Error"),
    DefinitionErrorClass: makeErrorClass("DefinitionError"),
    EvalErrorClass: makeErrorClass("EvalError"),
    RangeErrorClass: makeErrorClass("RangeError"),
    ReferenceErrorClass: makeErrorClass("ReferenceError"),
    SecurityErrorClass: makeErrorClass("SecurityError"),
    SyntaxErrorClass: makeErrorClass("SyntaxError"),
    TypeErrorClass: makeErrorClass("TypeError"),
    URIErrorClass: makeErrorClass("URIError"),
    VerifyErrorClass: makeErrorClass("VerifyError"),
    UninitializedErrorClass: makeErrorClass("UninitializedError"),
    ArgumentErrorClass: makeErrorClass("ArgumentError"),

    DateClass: DateClass,
    MathClass: MathClass,
    RegExpClass: RegExpClass,

    CapabilitiesClass: CapabilitiesClass,

    /**
     * DescribeType.as
     */
    getQualifiedClassName: constant(function (value) {
      if (typeof (value) === "number") {
        if ((value | 0) === value) {
          return "int";
        } else {
          return "Number";
        }
      } else {
        return notImplemented(value);
      }
    })
  }

}