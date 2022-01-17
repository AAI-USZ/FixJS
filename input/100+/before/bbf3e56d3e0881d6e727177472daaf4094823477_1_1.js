function(uuid) {
  var myUrl = '';
  if (window.location.pathname.match(/^\/dashboards/).length > 0) {
    myUrl = window.location.pathname + '/graphs/' + uuid
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
  });
}