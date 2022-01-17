function (_descriptor, fieldName, fieldType, defaultValueExpression) {
  var descriptor = this.ParseDescriptor(_descriptor, fieldName);

  var data = { fieldType: fieldType };

  var fieldIndex = this.PushMember("FieldInfo", descriptor, data);

  if (typeof (defaultValueExpression) === "function") {
    data.defaultValueExpression = defaultValueExpression;

    var target = descriptor.Target;
    JSIL.DefineLazyDefaultProperty(
      target, descriptor.EscapedName,
      function () {
        return data.defaultValue = defaultValueExpression(this);
      }
    );
  } else if (typeof (defaultValueExpression) !== "undefined") {
    descriptor.Target[descriptor.EscapedName] = data.defaultValue = defaultValueExpression;
  } else {
    var context = this.context;

    var members = this.typeObject.__Members__;

    var target = descriptor.Target;
    JSIL.DefineLazyDefaultProperty(
      target, descriptor.EscapedName,
      function () {
        var actualFieldInfo = members[fieldIndex];
        var actualFieldType = actualFieldInfo[2].fieldType;

        var fieldTypeResolved;

        if (actualFieldType.getNoInitialize) {
          // FIXME: We can't use ResolveTypeReference here because it would initialize the field type, which can form a cycle.
          // This means that when we create a default value for a struct type, we may create an instance of an uninitalized type
          //  or form a cycle anyway. :/
          fieldTypeResolved = actualFieldType.getNoInitialize();
        } else {
          fieldTypeResolved = actualFieldType;
        }

        if (!fieldTypeResolved)
          return;
        else if (Object.getPrototypeOf(fieldTypeResolved) === JSIL.GenericParameter.prototype)
          return;

        return data.defaultValue = JSIL.DefaultValue(fieldTypeResolved);
      }
    );
  }
}