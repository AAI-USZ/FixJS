function ObjectClass(runtime, scope, instance, baseClass) {
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