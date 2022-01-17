function (items, offset) {
        // terminating clause: we are the requested candidate
        if (offset === items.length) {
          return this;
        }
        // continuation clause
        var kid, kidName, matchName = items[offset];
        for(var i = 0, j = this.getChildCount(); i < j; i++) {
            kid = this.getChild(i);
            kidName = kid.getName();
            if (kidName !== null && kidName === matchName) {
              return kid.getChildRecursive(items, offset+1);
            }
        }
        return null;
      }