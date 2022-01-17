function(uuid, cb) {
  return $.ajax({
    accepts: {json: 'application/json'},
    cache: false,
    dataType: 'json',
    error: function(xhr, textStatus, errorThrown) { console.log(errorThrown); },
    type: 'DELETE',
    url: '/dashboards/' + uuid
  }).done(function(d) {
    console.log('Dashboard ' + uuid + ' successfully deleted');
    cb();
  });
}