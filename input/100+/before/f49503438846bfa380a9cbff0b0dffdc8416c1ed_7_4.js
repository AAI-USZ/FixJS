function (trait) {
          var name = "public$" + trait.name.getName();
          if (trait.isGetter() || trait.isSetter()) {
            var proto = instance.prototype;
            var qn = trait.name.getQualifiedName();
            var descriptor = Object.getOwnPropertyDescriptor(proto, name);
            if (trait.isGetter()) {
              defineGetter(proto, qn, descriptor.get);
            } else {
              defineSetter(proto, qn, descriptor.set);
            }
          } else {
            Object.defineProperty(instance.prototype, trait.name.getQualifiedName(), {
              get: function () { return this[name]; },
              enumerable: false
            });
          }
        }