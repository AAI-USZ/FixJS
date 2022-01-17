function(uuid, cb) {
  var myUrl = '';
  // dashboard
  if (window.location.pathname.match(/^\/dashboards/) !== null) {
    myUrl = window.location.pathname + '/graphs/' + uuid
  // graph palette
  } else {
    myUrl = window.location.pathname + '/' + uuid
  }
  return $.ajax({
    accepts: {json: 'application/json'},
    cache: false,
    dataType: 'json',
    error: function(xhr, textStatus, errorThrown) { console.log(errorThrown); },
    type: 'DELETE',
    url: myUrl
  }).done(function(d) {
    console.log('Graph ' + uuid + ' successfully deleted');
    cb();
  });
}