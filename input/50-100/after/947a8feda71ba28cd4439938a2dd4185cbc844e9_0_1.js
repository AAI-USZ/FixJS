function (event) {
      if (event.state && event.state._davis) {
        handler(new Davis.Request(event.state._davis))
      } else {
        if (hasPopped()) handler(Davis.Request.forPageLoad())
      };
      popped = true
    }