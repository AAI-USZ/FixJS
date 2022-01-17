function success(resp) {
      var r = resp.responseText
        , i
      if (r) {
        switch (type) {
        case 'json':
          try {
            resp = win.JSON ? win.JSON.parse(r) : eval('(' + r + ')')
          } catch (err) {
            return error(resp, 'Could not parse JSON in response', err)
          }
          break;
        case 'js':
          resp = eval(r)
          break;
        case 'html':
          resp = r
          break;
        case 'xml':
          resp = resp.responseXML;
          break;
        }
      }

      fn(resp)
      for (i = 0; i < fulfillmentHandlers.length; i++) {
        fulfillmentHandlers[i](resp)
      }
      complete(resp)
    }