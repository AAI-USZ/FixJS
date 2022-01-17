function (){
        if (typeof arguments[0]  === "number") {
          return this.children[arguments[0]];
        }
        if (arguments[0].indexOf('/') !== -1) { // path was given
          this.getChildRecursive(arguments[0].split("/"), 0);
          return null;
        }
        var kid, kidName;
        for (var i = 0, j = this.getChildCount(); i < j; i++) {
          kid = this.getChild(i);
          kidName = kid.getName();
          if (kidName !== null && kidName === arguments[0]) {
              return kid;
          }
        }
        return null;
      }