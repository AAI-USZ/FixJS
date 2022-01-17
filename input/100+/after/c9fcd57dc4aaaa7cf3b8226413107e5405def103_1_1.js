function() {
  var name = $('input.dashboard_name').val();
  var u = [];
  for (var i=0; i < $('span.graph label').length; i++) {
    u[i] = $($('span.graph label')[i]).attr('for')
  }
  var g_uuids = u.join(",");
  var myUrl = '/dashboards';
  $.ajax({
    accepts: {json: 'application/json'},
    data: {name: name, uuids: g_uuids},
    dataType: 'json',
    error: function(xhr, textStatus, errorThrown) { console.log(errorThrown); },
    type: 'POST',
    url: myUrl
  }).done(function(d) {
    window.location.href = "/dashboards/" + d.uuid;
  });
  return false;
}