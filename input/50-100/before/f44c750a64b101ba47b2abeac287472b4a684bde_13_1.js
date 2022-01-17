function(objectref)

  {

    for (var i=0, cookie; cookie = this.cookie_list[i]; i++) {

      if (cookie._objectref === objectref)

      {

        return cookie;

      }

    };

  }