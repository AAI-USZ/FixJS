function(values) {
    var max = Number.MIN_VALUE,
        min = Number.MAX_VALUE,
        val,
        cc,
        attrs = {};

    if (!this.params.min || !this.params.max) {
      for (cc in values) {
        val = parseFloat(values[cc]);
        if (val > max) max = values[cc];
        if (val < min) min = val;
      }
    }
    if (!this.params.min) {
      this.scale.setMin(min);
    }
    if (!this.params.max) {
      this.scale.setMax(max);
    }

    for (cc in values) {
      val = parseFloat(values[cc]);
      if (val) {
        attrs[cc] = this.scale.getValue(val);
      } else {
        attrs[cc] = this.elements[cc].element.style.initial[this.params.attribute];
      }
    }
    this.setAttributes(attrs);
    this.values = values;
  }