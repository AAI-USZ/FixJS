function(opts, cb) {
  console.log(opts);
  return $.ajax({
    accepts: {json: 'application/json'},
    cache: false,
    data: opts,
    dataType: 'json',
    error: function(xhr, textStatus, errorThrown) { console.log(textStatus); },
    type: 'PUT',
    url: window.location.pathname
  }).done(function(d) {
    console.log("successfully updated attribute");
    cb();
  })
}