function(res) {
      if (res.responseText) {
        var data = MochiKit.Base.evalJSON(res.responseText);
        return data.csrf_token;
      }
      else {
        throw new Error(chrome.i18n.getMessage('error_notLoggedin', self.name));
      }
    }