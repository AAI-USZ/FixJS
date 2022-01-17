function(callback) {
      log("Saving options...");
      var _this = this;

      if(arguments.length == 0) {
        var callback = function() {};
      }

      var badgeText = "";
      var lastAmazonImportInterval = _this.settings.amazonImportInterval;


      /*************************************************************/
      /*
        THIS IS DEV STUFF THAT SHOULD PROBABLY BE REMOVED OR HIDDEN
        WHEN THE EXTENSION IS RELEASED
      */

      _this.settings.isDev = toBool($("#isDev").prop("checked"));
      _this.settings.devDomain = $("#devDomain").val();

      //automatically set logging and caching to true if dev
      if(_this.settings.isDev) {
        _this.settings.logging_enabled = true;
        _this.settings.disabled_caching = true;
      } else { //production
        _this.settings.logging_enabled = false;
        _this.settings.disabled_caching = false;
      }

      /* END DEV STUFF */
      /*************************************************************/
      
      _this.settings.doKindleImport = toBool($("#doKindleImport").prop("checked"));
      
      _this.settings.amazonImportInterval = $("#amazon_import_interval_enabled option:selected").val();

      _this.settings.notificationsAmazonEnabledDesktop = $("#amazon_desktop_notifications_enabled").prop("checked");
      log("desktop notifications? " + $("#amazon_desktop_notifications_enabled").prop("checked"));
      log("desktop notifications setting: " + _this.settings.notificationsAmazonEnabledDesktop);

      _this.settings.notificationsAmazonEnabledEmail = $("#amazon_email_notifications_enabled").prop("checked");
      log("email notifications? " + $("#amazon_email_notifications_enabled").prop("checked"));
      log("email notifications setting: " + _this.settings.notificationsAmazonEnabledEmail);

      if(_this.settings.isDev) {
        badgeText = "DEV!";
      } else {
        badgeText = "";
      }
      chrome.browserAction.setBadgeText({"text": badgeText});
      this.setBadgeText();
    }