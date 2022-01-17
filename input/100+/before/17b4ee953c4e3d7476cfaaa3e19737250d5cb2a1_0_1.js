function NodeVtigerWS(url, username, accesskey, level) {
      var logger;
      if (level == null) {
        level = 'debug';
      }
      this._wsUrl = url + '/webservice.php';
      this._wsUsername = username;
      this._wsAccesskey = accesskey;
      this._wsToken = false;
      this._wsSessionName = false;
      this._wsUserId = false;
      this._isLogged = false;
      this._lastError = false;
      this._default_headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Accept-Charset": "utf-8"
      };
      this.__callback = false;
      logger = require('basic-logger');
      logger.setLevel(level);
      this.log = new logger({
        prefix: "node-vtiger"
      });
      this.log.debug("Vtiger_WSClient constructor");
    }