function(roots, rootValueTypes, defaultRootName, database) {
          var collection, root, rootName, valueType;
          rootName = _rootName != null ? _rootName : defaultRootName;
          valueType = rootValueTypes[rootName] != null ? rootValueTypes[rootName] : "text";
          collection = null;
          if (roots[rootName] != null) {
            root = roots[rootName];
            if ($.isPlainObject(root) || root instanceof Array) {
              collection = Expression.initCollection(root, valueType);
            } else {
              collection = Expression.initCollection([root], valueType);
            }
            return walkForward(collection, database);
          } else {
            throw new Error("No such variable called " + rootName);
          }
        }