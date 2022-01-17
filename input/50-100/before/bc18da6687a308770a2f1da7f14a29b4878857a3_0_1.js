function() {
    var d;
    if (this.current.pickedDateTime) {
      d = this.dateFormatter.format(this.current.pickedDateTime, this.current.options.valueFormat);
      return this.$valueElement.val(d);
    }
  }