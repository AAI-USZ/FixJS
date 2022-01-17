function()
    {
      this._lastReadyState = 0;

      var vRequest = this.getRequest();
      var vMethod = this.getMethod();
      var vAsynchronous = this.getAsynchronous();
      var vUrl = this.getUrl();

      // --------------------------------------
      //   Local handling
      // --------------------------------------
      var vLocalRequest = (org.eclipse.rwt.Client.getRunsLocally() && !(/^http(s){0,1}\:/.test(vUrl)));
      this._localRequest = vLocalRequest;

      // --------------------------------------
      //   Adding parameters
      // --------------------------------------
      var vParameters = this.getParameters();
      var vParametersList = [];

      for (var vId in vParameters)
      {
        var value = vParameters[vId];

        if (value instanceof Array)
        {
          for (var i=0; i<value.length; i++) {
            vParametersList.push(encodeURIComponent(vId) + "=" + encodeURIComponent(value[i]));
          }
        }
        else
        {
          vParametersList.push(encodeURIComponent(vId) + "=" + encodeURIComponent(value));
        }
      }

      if (vParametersList.length > 0) {
        vUrl += (vUrl.indexOf("?") >= 0 ? "&" : "?") + vParametersList.join("&");
      }

      var encode64 = function(input)
      {
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        do
        {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);

          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }

          output += keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }
        while (i < input.length);

        return output;
      };

      vRequest.onreadystatechange = qx.lang.Function.bind(this._onreadystatechange, this);

      // --------------------------------------
      //   Opening connection
      // --------------------------------------
      if (this.getUsername())
      {
        if (this.getUseBasicHttpAuth())
        {
          vRequest.open(vMethod, vUrl, vAsynchronous);
          vRequest.setRequestHeader('Authorization', 'Basic ' + encode64(this.getUsername() + ':' + this.getPassword()));
        }
        else
        {
          vRequest.open(vMethod, vUrl, vAsynchronous, this.getUsername(), this.getPassword());
        }
      }
      else
      {
        vRequest.open(vMethod, vUrl, vAsynchronous);
      }

      // --------------------------------------
      //   Applying request header
      // --------------------------------------
      // Add a Referer header

      // The Java backend uses the referer header, and Firefox doesn't send one by
      // default (see here:
      // http://www.mercurytide.co.uk/whitepapers/issues-working-with-ajax/ ). Even when
      // not using a backend that evaluates the referrer, it's still useful to have it
      // set correctly, e.g. when looking at server log files.

      if (! org.eclipse.rwt.Client.isWebkit() )
      {
        // avoid "Refused to set unsafe header Referer" in Safari and other Webkit-based browsers
        vRequest.setRequestHeader('Referer', window.location.href);
      }

      var vRequestHeaders = this.getRequestHeaders();

      for (var vId in vRequestHeaders) {
        vRequest.setRequestHeader(vId, vRequestHeaders[vId]);
      }

      // --------------------------------------
      //   Sending data
      // --------------------------------------
      try
      {
        vRequest.send(this.getData());
      }
      catch(ex)
      {
        if (vLocalRequest) {
          this.failedLocally();
        }
        else
        {
          throw new Error( "Failed to send data: " + ex );
        }

        return;
      }

      // --------------------------------------
      //   Readystate for sync reqeusts
      // --------------------------------------
      if (!vAsynchronous) {
        this._onreadystatechange();
      }
    }