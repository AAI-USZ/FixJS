function encodeCookie (cookie) {
      // set expire time prevent cookie become too large
      console.log(cookie);
      date = new Date(Date.now() + ONE_DAY)
      return cookie.replace(/expires=.*?(;|$)/i, 'expires=' + date.toGMTString());
    }