function(index) {
      var item = this.get(index);
      //HACK: Sometimes 0 is used which is always undefined, which is OK.
      if (item === undefined) return item;
      Util.assert(item.getTag() === Enum.constantPoolTag.CLASS);
      return item.getName();
    }