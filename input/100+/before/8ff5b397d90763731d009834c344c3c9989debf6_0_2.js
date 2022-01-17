function updatePosition( uri, position, onSuccess, onError ) {
  var uri_parts = uri.match(/[a-zA-Z0-9:=\/.]+/gi);
  var uri_position = uri_parts[0] + '/' + position.id + '?' + uri_parts[1];
  $.ajax({
    url: uri_position,
    type: 'PUT',
    data: $.toJSON(position),
    contentType: "application/json",
    dataType: "json",
    cache: false,
    success: function(classification) {
      onSuccess(classification);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      if (onError == null)
        alert(errorThrown);
      else
        onError({
          status: jqXHR.status, 
          message: errorThrown
        });
    }
  });
}