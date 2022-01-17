function (distance) {
      distance || (distance = 1);

      var index = (this.edits()[0] ? this.edits().length - distance : 0);
      if (index < 0) index = 0;

      return this.restore({_index:index});
    }