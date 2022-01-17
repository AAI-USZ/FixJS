function() {
    var d;
    if (this.current.pickedDateTime) {
      d = this.dateFormatter.format(this.current.pickedDateTime, this.current.options.displayFormat);
      this.$displayElement.val(d);
      return this.$displayElement.attr("value", d);
    }
  }