function(data) {
      $.cookie('oauth-token', data.token);
      window.authenticated = true;
      // Adjust URL
      var regex = new RegExp("\\?code="+match[1]);
      window.location.href = window.location.href.replace(regex, '');
    }