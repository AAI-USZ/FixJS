function (context, typeObject, publicInterface) {
  this.context = context;
  this.typeObject = typeObject;
  this.publicInterface = publicInterface;
  this.namespace = JSIL.GetTypeName(typeObject);
  this.externals = JSIL.AllImplementedExternals[this.namespace];
  if (typeof (this.externals) !== "object")
    this.externals = JSIL.AllImplementedExternals[this.namespace] = {};

  Object.defineProperty(this, "Type", {
    configurable: false,
    enumerable: true,
    value: typeObject
  });

  Object.defineProperty(this, "prototype", {
    configurable: false,
    enumerable: false,
    get: function () {
      throw new Error("Old-style use of $.prototype");
    }
  });

  this.DefineTypeAliases(
    JSIL.GetCorlib, [
      "System.Byte", "System.UInt16", "System.UInt32", "System.UInt64",
      "System.SByte", "System.Int16", "System.Int32", "System.Int64",
      "System.Single", "System.Double", "System.String", "System.Object",
      "System.Boolean", "System.Char"
    ]
  );

  this.memberDescriptorPrototype = {
    Static: false,
    Public: false,
    SpecialName: false,
    Name: null,
    toString: function () {
      return "<" + this.Name + " Descriptor>";
    }
  };
  
  this.constants = [];
}