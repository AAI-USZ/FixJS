function getProperty(obj, multiname) {
      if (obj instanceof FindProperty &&
          obj.multiname.name === multiname.name &&
          obj.multiname.isQName()) {
        return obj + "." + obj.multiname.getQualifiedName();
      }

      /**
       * Looping over arrays by index will use a MultinameL
       * as it's the simplest type of late name. Instead of
       * doing a runtime looking, quickly go through late
       * name lookup here.
       */
      if (multiname.isRuntimeName() && multiname.isPublicNamespaced()) {
        var value = state.stack.pop();
        return obj + "." + GET_ACCESSOR + "(" + value + ")";
      }

      return "getProperty" + argumentList(obj, objectConstant(multiname));
    }