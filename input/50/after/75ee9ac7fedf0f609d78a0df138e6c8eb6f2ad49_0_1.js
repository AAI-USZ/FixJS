function encodeCookie (cookie) {
      // set expire time prevent cookie become too large
      var date = new Date(Date.now() + ONE_DAY)
      return cookie.replace(/expires=.*?(;|$)/i, 'expires=' + date.toGMTString());
    }