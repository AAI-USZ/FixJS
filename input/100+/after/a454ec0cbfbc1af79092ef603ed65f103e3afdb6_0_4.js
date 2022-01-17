function CreateTypeObject () {
    var runtimeType;
    runtimeType = $jsilcore.$GetRuntimeType(assembly, fullName);

    var typeObject = JSIL.CloneObject(runtimeType);

    typeObject.__BaseType__ = JSIL.ResolveTypeReference(baseType, assembly)[1];
    var baseTypeName = typeObject.__BaseType__.__FullName__ || baseType.toString();
    var baseTypeInterfaces = typeObject.__BaseType__.__Interfaces__ || [];

    typeObject.__InheritanceDepth__ = (typeObject.__BaseType__.__InheritanceDepth__ || 0) + 1;
    typeObject.__IsArray__ = false;
    typeObject.__StructFields__ = $jsilcore.ArrayNotInitialized;
    typeObject.__StructFieldInitializer__ = $jsilcore.FunctionNotInitialized;
    typeObject.__MemberCopier__ = $jsilcore.FunctionNotInitialized;
    typeObject.__StructComparer__ = $jsilcore.FunctionNotInitialized;
    typeObject.__Properties__ = [];
    typeObject.__Initializers__ = [];
    typeObject.__Interfaces__ = Array.prototype.slice.call(baseTypeInterfaces);
    typeObject.__TypeInitialized__ = false;
    typeObject.__IsNativeType__ = false;
    typeObject.__AssignableTypes__ = null;
    typeObject.__IsReferenceType__ = isReferenceType;
    typeObject.__Context__ = assembly;
    typeObject.__FullName__ = fullName;
    typeObject.__ShortName__ = localName;
    typeObject.__LockCount__ = 0;
    typeObject.__Members__ = [];

    if (typeof(typeObject.__BaseType__.__RenamedMethods__) === "object")
      typeObject.__RenamedMethods__ = JSIL.CloneObject(typeObject.__BaseType__.__RenamedMethods__);
    else
      typeObject.__RenamedMethods__ = {};

    typeObject.__RawMethods__ = [];
    typeObject.__GenericArguments__ = genericArguments || [];
    typeObject.__IsStruct__ = !isReferenceType && (baseTypeName === "System.ValueType");
    typeObject.IsInterface = false;

    if (stack !== null)
      typeObject.__CallStack__ = stack;

    var inited = false;

    var staticClassObject = JSIL.MakeTypeConstructor(typeObject);

    JSIL.SetValueProperty(staticClassObject, "toString", function TypePublicInterface_ToString () {
      return "<" + fullName + " Public Interface>";
    });

    JSIL.SetValueProperty(typeObject, "toString", function Type_ToString () {
      return this.__FullName__;
    });

    staticClassObject.__TypeId__ = typeObject.__TypeId__ = JSIL.AssignTypeId(assembly, fullName);
    staticClassObject.__Type__ = typeObject;
    staticClassObject.prototype = JSIL.MakeProto(baseType, typeObject, fullName, false, assembly);
    staticClassObject.prototype.__ShortName__ = localName;

    if (typeObject.__GenericArguments__.length > 0) {
      staticClassObject.Of$NoInitialize = $jsilcore.$Of$NoInitialize.bind(staticClassObject);
      staticClassObject.Of = $jsilcore.$Of.bind(staticClassObject);
      typeObject.__IsClosed__ = false;
      typeObject.__OfCache__ = {};
    } else {
      typeObject.__IsClosed__ = !(baseType.__IsClosed__ === false);
    }

    typeObject.__PublicInterface__ = staticClassObject;

    typeObject._IsAssignableFrom = function (typeOfValue) {
      return typeOfValue.__AssignableTypes__[this.__TypeId__] === true;
    };

    for (var i = 0, l = typeObject.__GenericArguments__.length; i < l; i++) {
      var ga = typeObject.__GenericArguments__[i];
      var name = new JSIL.Name(ga, fullName);

      JSIL.SetValueProperty(staticClassObject, ga, name);
    }    

    JSIL.ApplyExternals(staticClassObject, typeObject, fullName);

    JSIL.MakeCastMethods(staticClassObject, typeObject, null);

    return staticClassObject;
  }