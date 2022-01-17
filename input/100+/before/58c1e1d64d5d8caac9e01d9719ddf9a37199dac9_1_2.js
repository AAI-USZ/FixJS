function() {
      var _this = this;

      _this.log("Restoring options...");

      $("#isDev").prop("checked", _this.settings.isDev);
      $("#devDomain").val(_this.settings.devDomain);
      $("#doKindleImport").prop("checked", _this.settings.doKindleImport);
      $("#amazon_desktop_notifications_enabled").prop("checked", _this.settings.notificationsAmazonEnabledDesktop);
      $("#amazon_email_notifications_enabled").prop("checked", _this.settings.notificationsAmazonEnabledEmail);

      _this.useDomain = _this.settings.base_domain;
      if(_this.settings.isDev) {
        _this.useDomain = _this.settings.devDomain;
      }

      if(doKindleImport) {
        _this.getAmazonLoginStatus(false); //false == get status but do not execute import
      } else {
        //don't show the checking Amazon status
        $("#amazon_logged_in").hide();
        $("#amazon_logged_out").hide();
        $("#findings_logged_out").hide();
        $("#amazon_checking_login").hide();
      }

      var lastImportDate, importDateText;

      if(_this.settings.lastImportDate != "never") {
        lastImportDate = new Date(_this.settings.lastImportDate);

        var friendlyTime;
        if(lastImportDate.getHours() > 12) {
          friendlyTime = lastImportDate.getHours()-12;
        } else {
          friendlyTime = lastImportDate.getHours();
        }
        friendlyTime += ":" + lastImportDate.getMinutes();
        if(lastImportDate.getHours() > 12) {
          friendlyTime += "pm";
        } else {
          friendlyTime +="am";
        }

        importDateText = lastImportDate.toLocaleDateString() + " at " + friendlyTime;
        
      } else {
        importDateText = _this.settings.lastImportDate;
      }
      
      $("#lastImportDate").html(importDateText);

      //get Findings login status
      _this.getFindingsLoginStatus(function() {
        //_this.amazonImportOptionDisplay();
      });
    }