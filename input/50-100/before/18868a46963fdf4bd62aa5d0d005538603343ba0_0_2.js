function(event) {
    event.preventDefault();
    $result.fadeOut();


    var $request = jQuery.ajax({
      url: request_url,
      type: 'POST',
      data: {
        'url': $(this).find('.url-field').val()
      }
    });

    $request.done(function() {
      set_result_elm('done');
    });

    $request.fail(function(xhr) {
      set_result_elm('fail', xhr.status);
    });
  }