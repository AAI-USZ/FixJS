function ApplicationDomainClass(runtime, scope, instance, baseClass) {
    var c = new Class("ApplicationDomain", instance, C(instance));
    c.extend(baseClass);

    c.nativeMethods = {
      ctor: function (parentDomain) {
        // If no parent domain is passed in, get the current system domain.
        var parent;
        if (!parentDomain) {
          parent = Runtime.stack.top().domain;
          while (parent.base) {
            parent = parent.base;
          }
        } else {
          parent = parentDomain.d;
        }

        glue(new Domain(parent), this);
      },

      "get parentDomain": function () {
        var base = this.d.base;

        if (!base) {
          return undefined;
        }

        if (base.p) {
          return base.p;
        }

        return glue(base, new instance());
      },

      getDefinition: function (name) {
        return this.d.getProperty(Multiname.fromSimpleName(name), false, true);
      },

      hasDefinition: function (name) {
        return !!this.d.findProperty(Multiname.fromSimpleName(name), false, false);
      }
    };

    c.nativeStatics = {
      "get currentDomain": function () {
        var domain = Runtime.stack.top().domain;

        if (domain.p) {
          return domain.p;
        }

        return glue(domain, new instance());
      }
    };

    return c;
  }