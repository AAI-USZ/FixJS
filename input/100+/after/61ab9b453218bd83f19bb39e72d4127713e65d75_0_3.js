function (id, g, offset) {
    var body = [];

    body.push("  var argc = arguments.length;");

    var isFirst = true;
    var methodKey = null;

    for (var k in g) {
      if (k == "ga")
        continue;
      else if (k == "gaCount")
        continue;

      var line = "";

      if (isFirst) {
        line += "  if (argc === ";
      } else {
        line += "  } else if (argc === ";
      }

      line += (parseInt(k) + offset) + ") {";

      body.push(line);

      var group = g[k];

      if (group.ga === true) {
        methodKey = makeGenericArgumentGroup(id + "`" + k, group, group.gaCount + offset);
      } else if (group.length === 1) {
        methodKey = makeSingleMethodGroup(group);
      } else {
        methodKey = makeMultipleMethodGroup(id, group, offset);
      }

      body.push("    return thisType[\"" + methodKey + "\"].apply(this, arguments);");

      isFirst = false;
    }

    body.push("  }");
    body.push("  ");
    body.push("  throw new Error('No overload of ' + name + ' can accept ' + (argc - offset) + ' argument(s).')");

    var bodyText = body.join("\r\n");

    var boundDispatcher = JSIL.CreateNamedFunction(
      id, [],
      bodyText,
      {
        thisType: target,
        name: methodName,
        offset: offset
      }
    );

    /*
    JSIL.SetValueProperty(boundDispatcher, "toString", 
      function OverloadedMethod_ToString () {
        return "<Overloaded Method " + id + " - " + overloadSignatures.length + " overload(s)>";
      }    );
    */

    return JSIL.$MakeAnonymousMethod(target, boundDispatcher);
  };
