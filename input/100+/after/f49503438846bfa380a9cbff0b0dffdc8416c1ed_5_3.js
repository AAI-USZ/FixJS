function createVectorClass(runtime, type, baseClass) {
    var TypedArray = createNewGlobalObject().Array;

    // Breaks semantics with bounds checking for now.
    if (type) {
      const coerce = type.instance;
      var TAp = TypedArray.prototype;
      TAp.indexGet = function (i) { return this[i]; };
      TAp.indexSet = function (i, v) { this[i] = coerce(v); };
    }

    function TypedVector (length, fixed) {
      var array = new TypedArray(length);
      for (var i = 0; i < length; i++) {
        array[i] = type ? type.defaultValue : undefined;
      }
      return array;
    }
    TypedVector.prototype = TypedArray.prototype;
    var name = type ? "Vector$" + type.classInfo.instanceInfo.name.name : "Vector";
    var c = new runtime.domain.system.Class(name, TypedVector, C(TypedVector));
    var m = TypedArray.prototype;

    defineReadOnlyProperty(TypedArray.prototype, "class", c);

    defineNonEnumerableProperty(m, "get fixed", function () { return false; });
    defineNonEnumerableProperty(m, "set fixed", function (v) { });

    defineNonEnumerableProperty(m, "get length", function () { return this.length; });
    defineNonEnumerableProperty(m, "set length", function setLength(length) {
      // TODO: Fill with zeros if we need to.
      this.length = length;
    });

    c.extendBuiltin(baseClass);
    c.nativeMethods = m;
    c.nativeStatics = {};
    c.vectorType = type;
    c.isInstance = function (value) {
      if (value === null || typeof value !== "object") {
        return false;
      }
      if (!this.instance.vectorType && value.class.vectorType) {
        return true;
      }
      return this.instance.prototype.isPrototypeOf(value);
    };

    return c;
  }