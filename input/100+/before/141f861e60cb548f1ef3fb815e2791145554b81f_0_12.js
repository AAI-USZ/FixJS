function (items, offset) {
        var kid, kidName;
        for(var i = 0, j = this.getChildCount(); i < j; i++) {
            kid = this.getChild(i);
            kidName = kid.getName();
            if (kidName !== null && kidName === items[offset]) {
              if (offset === items.length-1) {
                return kid;
              }
              offset += 1;
              return kid.getChildRecursive(items, offset);
            }
        }
        return null;
      }