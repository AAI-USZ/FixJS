function() {
      $.ajax({
        type: 'GET',
        url: root_url + 'api/is_pinned/' + trace.traceId,
        success: function(data){
          pinned = data.pinned === true;
          updatePinButton();
        },
        error: function(xhr, status, error) {
          $('#pinned-modal-error').text("Could not check trace pin status due to this error: " + error);
          $('#pinned-modal').modal('show');
        }
      });
    }