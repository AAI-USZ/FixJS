function(callback, returnUrl) {
    MobDeals.Log.click({'event': 'facebook', 'return_url': returnUrl});

    var appId = '249222915102781';    // production
    if (window.location.hostname.indexOf('mobstaging.com') != -1) {
      appId = '288627961176125';      // staging
    }
    else if (window.location.hostname.indexOf('localhost') != -1 || window.location.hostname.indexOf('127.0.0.1') != -1) {
      var appId = '293759800656841';  // development
    }

    var cancelUrl = redirectUrl = MobDeals.host('core') + '/users/auth/facebook/callback';
    var facebookLoginUrl = 'http://m.facebook.com/login.php?app_id=' + appId +
    '&cancel=' + escape(cancelUrl) +
      '%3Ferror_reason%3Duser_denied' +
      '%26error%3Daccess_denied' +
      '%26error_description%3DThe%2Buser%2Bdenied%2Byour%2Brequest.' +
    '&fbconnect=1' +
    '&next=https%3A%2F%2Fm.facebook.com%2Fdialog%2Fpermissions.request' +
      '%3F_path%3Dpermissions.request' +
      '%26app_id%3D' + appId +
      '%26redirect_uri%3D' + escape(escape(redirectUrl)) +
      '%26display%3Dtouch' +
      '%26response_type%3Dcode' +
      '%26state%3D' + escape(escape(returnUrl)) +
      '%26perms%3Demail%252Coffline_access' +
      '%26fbconnect%3D1' +
      '%26from_login%3D1' +
      '%26client_id%3D' + appId +
    '&rcount=1' +
    '&_rdr';
    MobDeals.redirect(facebookLoginUrl);
  }