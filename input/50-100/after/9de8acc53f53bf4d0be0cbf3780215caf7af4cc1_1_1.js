function reffedValue(deref) {
      var tmp;
      if (!deref) {
        return this;
      } else {
        tmp = this;
        if (this.unmemoized) {
          console.log("DEREF: " + this.main + "()  [" + this.unmemoized + "()]");
        }
        return tmp.copyWith("" + tmp.main + "()");
      }
    }