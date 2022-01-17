function(user){
    $.log("userLoggedCallbackFn:"+ (user?user.username:null));

    if (!user) {
      $("#login-link").show();
      $("#register-link").show();
      $("#change-password-link").hide();
      checkUrlParams();
    } else {
      $("#change-password-link").show();
      $("#logout-link").show();
      $("#register-link").hide();
      $("#login-link").hide();
      decorateMenuWithKarma(user);
    }
  }