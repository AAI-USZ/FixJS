function(clazz, mixin, patch)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        if (!clazz || !mixin) {
          throw new Error("Incomplete parameters!");
        }
      }

      if (this.hasMixin(clazz, mixin)) {
        return;
      }

      var isConstructorWrapped = clazz.$$original;
      if (mixin.$$constructor && !isConstructorWrapped) {
        clazz = this.__retrospectWrapConstruct(clazz);
      }

      // Attach content
      var list = qx.Mixin.flatten([mixin]);
      var entry;

      for (var i=0, l=list.length; i<l; i++)
      {
        entry = list[i];

        // Attach events
        if (entry.$$events) {
          this.__addEvents(clazz, entry.$$events, patch);
        }

        // Attach properties (Properties are already readonly themselves, no patch handling needed)
        if (entry.$$properties) {
          this.__addProperties(clazz, entry.$$properties, patch);
        }

        // Attach members (Respect patch setting, but dont apply base variables)
        if (entry.$$members) {
          this.__addMembers(clazz, entry.$$members, patch, patch, patch);
        }
      }

      // Store mixin reference
      if (clazz.$$includes)
      {
        clazz.$$includes.push(mixin);
        clazz.$$flatIncludes.push.apply(clazz.$$flatIncludes, list);
      }
      else
      {
        clazz.$$includes = [mixin];
        clazz.$$flatIncludes = list;
      }
    }