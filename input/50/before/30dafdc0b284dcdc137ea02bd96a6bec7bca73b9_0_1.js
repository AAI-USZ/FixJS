function(success) {
    $.ajax({
      url: '/',
      method: 'GET',
      dataType: 'json',
      success: success
    });
  }