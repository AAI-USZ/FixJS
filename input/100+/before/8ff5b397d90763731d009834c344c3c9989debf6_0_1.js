function deletePosition( uri, position, confirmationMsg, onSuccess, onError ) {
  var confirmed = true;
  if (confirmationMsg != null && confirmationMsg.length > 0)
    confirmed = window.confirm( confirmationMsg );
  if (confirmed) {
    var uri_parts = uri.match(/[a-zA-Z0-9:=\/.]+/gi);
    var uri_position = uri_parts[0] + '/' + position.id + '?' + uri_parts[1];
    $.ajax({
      url: uri_position,
      type: "DELETE",
      success: function() {
        onSuccess();
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
}