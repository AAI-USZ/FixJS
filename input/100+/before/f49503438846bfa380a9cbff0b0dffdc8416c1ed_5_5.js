function NamespaceClass(runtime, scope, instance, baseClass) {
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