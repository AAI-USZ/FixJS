function() {
    var d;
    if (this.current.pickedDateTime) {
      d = this.dateFormatter.format(this.current.pickedDateTime, this.current.options.valueFormat);
      this.$valueElement.val(d);
      return this.$valueElement.attr("value", d);
    }
  }