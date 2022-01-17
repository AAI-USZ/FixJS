function(callback) {
    $.support.cors = true;

    $.ajax({
      url: MobDeals.host('core')+'/users/sign_out.json', 
      type: 'POST',
      xhrFields: {withCredentials: true},
      data: {_method: 'delete'},
      crossDomain: true,
      success: function(data) {
        MobDeals.Account._clear();
        if (callback) { callback.apply(callback); }
      },
      dataType: 'json'
    });
  }