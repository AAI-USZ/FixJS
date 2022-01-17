function(ress) {
        var errs = [], urls = [];
        for (var name in ress) {
          var success = ress[name][0], res = ress[name][1];
          if (!success) {
            var msg = name + ': ' +
              (res.message.hasOwnProperty('status') ?
               '\n' + ('HTTP Status Code ' + res.message.status).indent(4) :
               '\n' + res.message.indent(4));
            errs.push(msg);
            urls.push(models[name].LOGIN_URL);
          }
        }

        if (TBRL.Config.post['notification_on_posting']) {
          setTimeout(function () {
            notifications.forEach(function(notification) {
              try {
                notification.cancel();
              } catch (e) {}
            });
          }, 500);
        }

        if (errs.length) {
          self.alertError(
            chrome.i18n.getMessage(
              'error_post', [errs.join('\n').indent(2), ps.page, ps.pageUrl]),
            ps.pageUrl, urls);
        } else {
          delete TBRL.Popup.contents[ps.pageUrl];
        }
      }