function() {
      var _this = this;

      //select the appropriate option for import interval regardless of login
      var amazonImportInterval = _this.settings.amazonImportInterval;
      var $amazon_import_interval_enabled = $("#amazon_import_interval_enabled");

      $amazon_import_interval_enabled.val(_this.settings.amazonImportInterval);
      //if coming out of dev mode and the hourly and minute intervals no longer exist...
      if($("#amazon_import_interval_enabled option:selected").val() != amazonImportInterval) {
        $amazon_import_interval_enabled.val(24);
      }

      if(this.settings.doKindleImport) { //kindle import is enabled

        if(_this.amazonLoggedIn) { //logged into Amazon

          if(!_this.findingsLoggedIn) { //not logged into Findings
            $("#findings_logged_out").show();
            $("#amazon_logged_out").hide();
            $("#amazon_logged_in").hide();
          } else {
            $("#findings_logged_out").hide();
            $("#amazon_logged_out").hide();
            $("#amazon_logged_in").show();            
          }

        } else { //not logged into Amazon
          $("#findings_logged_out").hide();
          $("#amazon_logged_in").hide();
          $("#amazon_logged_out").show();

        }

      } else { //kindle import is disabled
          $("#findings_logged_out").hide();
          $("#amazon_logged_in").hide();
          $("#amazon_logged_out").hide();
      }
    }