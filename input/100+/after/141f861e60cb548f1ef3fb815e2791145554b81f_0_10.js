function (selector) {
        if (typeof selector === "number") {
          return this.children[selector];
        }
        if (selector.indexOf('/') !== -1) {
          // path traversal is required
          return this.getChildRecursive(selector.split("/"), 0);
        }
        var kid, kidName;
        for (var i = 0, j = this.getChildCount(); i < j; i++) {
          kid = this.getChild(i);
          kidName = kid.getName();
          if (kidName !== null && kidName === selector) {
              return kid;
          }
        }
        return null;
      }