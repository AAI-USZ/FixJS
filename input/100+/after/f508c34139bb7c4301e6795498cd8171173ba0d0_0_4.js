function() {
    var input = $('form#input .privmsg');
    var message = input.attr('value');

    $('form#input').removeClass('error').addClass('sending');
    $.ajax({
      url: mutiny.api_url,
      timeout: 10 * 1000,
      dataType: 'json',
      type: 'POST',
      data: {
        'a': 'say',
        'msg': message,
      },
      success: function(data) {
        $('form#input').removeClass('error').removeClass('sending');
      },
      error: function(jqXHR, stat, errThrown) {
        alert('Oops, sending failed!');
        input.attr('value', message + ' ' + input.attr('value'));
        $('form#input').addClass('error').removeClass('sending');
      }
    });

    input.attr('value', '');
    return false;
  }