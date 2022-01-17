function(cookies)
  {
    var cookie = cookies.pop();
    var callback = this.remove_cookies.bind(this, cookies);
    if (cookies.length === 0)
    {
      callback = this.refetch;
    }
    this.remove_cookie(cookie._objectref, callback);
  }