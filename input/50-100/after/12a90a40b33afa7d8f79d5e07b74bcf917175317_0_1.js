function reffedValue(deref) {
      var tmp;
      if (!deref) {
        return this;
      } else {
        tmp = this;
        return tmp.copyWith("" + tmp.main + "()");
      }
    }