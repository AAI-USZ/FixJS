function Context($this, $parent, extras) {
    this.$this = $this;

    if ($parent) {
      this.$parent = $parent;
      this.$parents = $parent.$parents.slice();
      this.$parents.unshift($parent);
    } else {
      this.$root = $this;
      this.$parents = [];
    }

    //if (typeof extras === "object") {
      //Object.extend(this, extras);
    //}

    if (typeof $this === "object") {
      //Object.extend(this, $this);
      Object.keys($this).forEach(function (key) {
        this[key] = $this[key];
      }, this);
    }
  }