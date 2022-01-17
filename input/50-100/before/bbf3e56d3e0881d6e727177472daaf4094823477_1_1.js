function(opts) {
  console.log(opts);
  var myUrl = window.location.pathname;
  return $.ajax({
    accepts: {json: 'application/json'},
    cache: false,
    data: opts,
    dataType: 'json',
    error: function(xhr, textStatus, errorThrown) { console.log(textStatus); },
    type: 'PUT',
    url: myUrl
  }).done(function(d) {
    window.location.href = myUrl;
  })
}