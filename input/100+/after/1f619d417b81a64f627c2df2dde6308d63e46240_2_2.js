function _request(method, path, data, token, cb) {
    $.ajax({
        type: method,
        url: path,
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: function(res) { cb(null, res); },
        error: function (request, status, error) {
          jQuery.parseJSON( request.responseText );
          console.log(status);
        },
        headers : 'Authorization: token ' + token
    });
  }