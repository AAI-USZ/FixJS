function (fullName, isPublic, genericArguments, initializer) {
  if (typeof (isPublic) === "undefined")
    JSIL.Host.error(new Error("Must specify isPublic"));

  var assembly = $private;
  var localName = JSIL.GetLocalName(fullName);

  var runtimeType = $jsilcore.$GetRuntimeType(assembly, fullName);
  var typeObject = JSIL.CloneObject(runtimeType);
  typeObject.__FullName__ = fullName;

  if (typeof (printStackTrace) === "function")
    typeObject.__CallStack__ = printStackTrace();

  typeObject.__Context__ = assembly;
  typeObject.__InheritanceDepth__ = 1;
  typeObject.__BaseType__ = null;
  typeObject.__ShortName__ = localName;
  typeObject.__IsStatic__ = true;
  typeObject.__Properties__ = [];
  typeObject.__Initializers__ = [];
  typeObject.__Interfaces__ = [];
  typeObject.__Members__ = [];
  typeObject.__FieldsToInitialize__ = [];
  typeObject.__RenamedMethods__ = {};
  typeObject.__RawMethods__ = [];
  typeObject.__TypeInitialized__ = false;
  typeObject.__GenericArguments__ = genericArguments || [];

  typeObject.IsInterface = false;

  var staticClassObject = JSIL.CloneObject(JSIL.StaticClassPrototype);
  staticClassObject.__Type__ = typeObject;
  staticClassObject.__TypeId__ = typeObject.__TypeId__ = JSIL.AssignTypeId(assembly, fullName);
  typeObject.__PublicInterface__ = staticClassObject;

  if (typeObject.__GenericArguments__.length > 0) {
    staticClassObject.Of$NoInitialize = $jsilcore.$Of$NoInitialize.bind(staticClassObject);
    staticClassObject.Of = $jsilcore.$Of.bind(staticClassObject);
    typeObject.__IsClosed__ = false;
    typeObject.__OfCache__ = {};
  } else {
    typeObject.__IsClosed__ = true;
  }

  for (var i = 0, l = typeObject.__GenericArguments__.length; i < l; i++) {
    var ga = typeObject.__GenericArguments__[i];
    var name = new JSIL.Name(ga, fullName);

    JSIL.SetValueProperty(staticClassObject, ga, name);
  }

  var creator = function CreateStaticClassObject () {
    JSIL.ApplyExternals(staticClassObject, typeObject, fullName);

    return staticClassObject;
  };

  if (creator) {
    var decl = {
      value: fullName + ".__creator__",
      configurable: true,
      enumerable: true
    };

    Object.defineProperty(creator, "__name__", decl);
    Object.defineProperty(creator, "debugName", decl);
    Object.defineProperty(creator, "displayName", decl);
  }

  var wrappedInitializer = null;

  if (initializer) {
    var decl = {
      value: fullName + ".__initializer__",
      configurable: true,
      enumerable: true
    };

    Object.defineProperty(initializer, "__name__", decl);
    Object.defineProperty(initializer, "debugName", decl);
    Object.defineProperty(initializer, "displayName", decl);

    wrappedInitializer = function (to) {
      var interfaceBuilder = new JSIL.InterfaceBuilder(assembly, to.__Type__, to);
      initializer(interfaceBuilder);
    };
  }

  JSIL.RegisterName(fullName, assembly, isPublic, creator, wrappedInitializer);
}