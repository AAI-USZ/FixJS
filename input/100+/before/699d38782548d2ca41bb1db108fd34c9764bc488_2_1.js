function(callback) {
      log("Saving options...");
      var _this = this;

      if(arguments.length == 0) {
        var callback = function() {};
      }

      var badgeText = "";
      var lastAmazonImportInterval = _this.settings.amazonImportInterval;

      _this.settings.isDev = toBool($("#isDev").prop("checked"));
      _this.settings.devDomain = $("#devDomain").val();
      _this.settings.doKindleImport = toBool($("#doKindleImport").prop("checked"));
      _this.settings.amazonImportInterval = $("#amazon_import_interval_enabled option:selected").val();

      if(_this.settings.isDev) {
        badgeText = "DEV!";
      } else {
        badgeText = "";
      }
      chrome.browserAction.setBadgeText({"text": badgeText});
      this.setBadgeText();
    }