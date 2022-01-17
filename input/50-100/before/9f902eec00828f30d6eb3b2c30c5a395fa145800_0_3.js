function (e) {
      $.ajax({
        type: 'GET',
        url: root_url + 'traces/pin_json?trace_id=' + trace.trace_id + '&pinned=' + !pinned, // toggled the pinned status
        success: function(data){
          pinned = data.pinned === true;
          updatePinButton();
        },
        error: function(xhr, status, error) {
          $('#pinned-modal-error').text("Could not pin trace due to this error: " + error);
          $('#pinned-modal').modal('show');
        }
      });
      return false;
    }