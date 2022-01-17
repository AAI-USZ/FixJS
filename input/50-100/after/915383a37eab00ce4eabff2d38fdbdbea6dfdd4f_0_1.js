function(res) {
      if (res.responseText) {
        try {
          var data = MochiKit.Base.evalJSON(res.responseText);
        }
        catch (e) {
          throw new Error(chrome.i18n.getMessage('error_notLoggedin', self.name));
        }
        return data.csrf_token;
      }
      else {
        throw new Error(chrome.i18n.getMessage('error_notLoggedin', self.name));
      }
    }