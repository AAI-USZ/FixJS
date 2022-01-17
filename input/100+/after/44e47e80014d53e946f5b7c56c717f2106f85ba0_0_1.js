function() {
              var username = jQuery('#sauce-username').val();
              var accesskey = jQuery('#sauce-accesskey').val();
              var choice = jQuery('#sauce-browser').val();
              var browser = sauceBrowsers[choice];
              sauce.setCredentials(username, accesskey);
              sauce.setBrowser(sauce.browserOptionName(browser));
              sauce.settingspanel.hide();
              if (callback) {
                callback({
                  'username': username,
                  'accesskey': accesskey,
                  'browserstring': browser.api_name,
                  'browserversion': browser.short_version,
                  'platform': browser.os
                });
              }
            }