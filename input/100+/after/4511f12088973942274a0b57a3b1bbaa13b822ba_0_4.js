function (callback) {
  var repr = [];
  for (var i=0; i<this.annotations.length; i++) {
    if (this.annotations[i].fromServer) {
      continue;
    }
    repr.push(this.annotations[i].repr);
  };
  var data = {annotations: repr};
  $.ajax({
    url: this.annotationUrl,
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify(data),
    success: function () {
      callback();
    }
  });
}