function(evt) {
    var data = self.getData();
    var value = $(this).val();
    if (data) data.value = value;
    this._value = value;
  }