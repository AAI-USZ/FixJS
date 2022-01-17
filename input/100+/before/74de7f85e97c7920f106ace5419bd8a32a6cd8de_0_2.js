function() {
          if (!as2Object) {
            var nativeObjectContructor = this.nativeObjectContructor || AS2MovieClip;
            as2Object = new nativeObjectContructor();
            as2Object.$attachNativeObject(this);
            as2Object['this'] = as2Object;

            var registerChild = (function(name, obj) {
              Object.defineProperty(as2Object, name, {
                get: function() {
                  return obj.$as2Object;
                },
                configurable: true,
                enumerable: true
              });
            });
            for (var child in children) {
              if (children.hasOwnProperty(child))
                registerChild(child, children[child]);
            }
            var oldAddChild = proto.$addChild;
            proto.$addChild = (function(name, child) {
              oldAddChild.call(this, name, child);
              registerChild(name, child);
            });
          }
          return as2Object;
        }