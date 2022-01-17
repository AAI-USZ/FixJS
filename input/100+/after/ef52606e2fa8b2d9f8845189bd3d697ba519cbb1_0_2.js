function(callback, returnUrl) {
    this.cookied(function(isCookied) {
      if (isCookied) {
        callback.apply(callback);
      } else {
        MobDeals.Account.loginPrompt(callback, null, returnUrl);
      }
    });
  }