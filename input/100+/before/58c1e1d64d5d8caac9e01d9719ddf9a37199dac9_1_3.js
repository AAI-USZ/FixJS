function() {
      var _this = this;

      //select the appropriate option for import interval regardless of login
      var amazonImportInterval = _this.settings.amazonImportInterval;
      var intervalChooser = document.getElementById("amazon_import_interval_enabled");

      switch(amazonImportInterval) {
        case "-1":
          intervalChooser.options[0].selected = true;
          break;
        case "720":
          intervalChooser.options[1].selected = true;
          break;
        case "168":
          intervalChooser.options[2].selected = true;
          break;
        case "24":
          intervalChooser.options[3].selected = true;
          break;
        case "12":
          intervalChooser.options[4].selected = true;
          break;
        case "1":
          intervalChooser.options[5].selected = true;
          break;
        case ".017":
          intervalChooser.options[6].selected = true;
          break;
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