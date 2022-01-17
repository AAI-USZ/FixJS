function(aCallback) {
      // TODO: we need to be smarter here and do some stuff with redirects and
      // other fun stuff, but this works for hotmail, so yay.

      let conn = this;

      let xhr = new XMLHttpRequest({mozSystem: true});
      xhr.open("POST", "https://m.hotmail.com/autodiscover/autodiscover.xml",
               true, this._email, this._password);
      xhr.onload = function() {
        if (typeof logXhr == "function") // TODO: remove this debug code
          logXhr(xhr);

        let doc = new DOMParser().parseFromString(xhr.responseText, "text/xml");
        let getString = function(xpath, rel) {
          return doc.evaluate(xpath, rel, nsResolver, XPathResult.STRING_TYPE,
                              null).stringValue;
        };

        let error = doc.evaluate(
          "/ad:Autodiscover/ms:Response/ms:Error", doc, nsResolver,
          XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (error) {
          aCallback({
            "error": {
              "message": getString("ms:Message/text()", error),
            }
          });
        }
        else {
          let user = doc.evaluate(
            "/ad:Autodiscover/ms:Response/ms:User", doc, nsResolver,
            XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
          let server = doc.evaluate(
            "/ad:Autodiscover/ms:Response/ms:Action/ms:Settings/ms:Server", doc,
            nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
            .singleNodeValue;

          let result = {
            "user": {
              "name":  getString("ms:DisplayName/text()",  user),
              "email": getString("ms:EMailAddress/text()", user),
            },
            "server": {
              "type": getString("ms:Type/text()", server),
              "url":  getString("ms:Url/text()",  server),
              "name": getString("ms:Name/text()", server),
            }
          };

          conn.baseURL = result.server.url + "/Microsoft-Server-ActiveSync";
          conn.options(conn.baseURL, function(aSubResult) {
            result.options = aSubResult;
            aCallback.call(conn, result);
          });
        }
      };

      // TODO: use something like
      // http://ejohn.org/blog/javascript-micro-templating/ here?
      let postdata =
      '<?xml version="1.0" encoding="utf-8"?>\n' +
      '<Autodiscover xmlns="http://schemas.microsoft.com/exchange/autodiscover/mobilesync/requestschema/2006">\n' +
      '  <Request>\n' +
      '    <EMailAddress>' + this._email + '</EMailAddress>\n' +
      '      <AcceptableResponseSchema>http://schemas.microsoft.com/exchange/autodiscover/mobilesync/responseschema/2006</AcceptableResponseSchema>\n' +
      '  </Request>\n' +
      '</Autodiscover>';

      xhr.setRequestHeader("Content-Type", "text/xml");
      xhr.send(postdata);
    }