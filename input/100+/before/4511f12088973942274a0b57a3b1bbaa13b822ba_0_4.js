function (callback) {
  var repr = [];
  for (var i=0; i<this.annotations.length; i++) {
    repr.push(this.annotations[i].repr);
  };
  $.ajax({
    url: this.annotationUrl,
    contentType: 'application/json',
    type: 'PUT',
    data: JSON.stringify(repr),
    success: function () {
      callback();
    }
  });
}