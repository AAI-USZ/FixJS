function() {
      unregisterAll();
      mediator.reset();
      xhr.init({
        transport: transport,
        time_until_delay: TestHelpers.XHR_TIME_UNTIL_DELAY
      });

      transport.setDelay(0);
      transport.setContextInfo("auth_level", undefined);
      transport.setContextInfo("cookies_enabled", true);
      transport.useResult("valid");

      network.init({ forceCookieStatus: undefined });
      clearStorage();

      $("body").stop().show();
      $("body")[0].className = "";

      $(".error").removeClass("error");
      $("#error").hide();
      $(".notification").stop().hide();
      $("form").show();
      screens.wait.hide();
      screens.error.hide();
      screens.delay.hide();
      tooltip.reset();
      provisioning.setStatus(provisioning.NOT_AUTHENTICATED);
      user.reset();
      user.init({
        provisioning: provisioning
      });
      user.setOrigin(testOrigin);

    }