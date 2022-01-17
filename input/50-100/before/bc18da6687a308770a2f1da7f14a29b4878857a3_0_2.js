function() {
    var d;
    if (this.current.pickedDateTime) {
      d = this.dateFormatter.format(this.current.pickedDateTime, this.current.options.displayFormat);
      return this.$displayElement.val(d);
    }
  }