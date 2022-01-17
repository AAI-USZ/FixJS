function (err, user) {

      if (err) {

        return next(err);

      }

      for (var k in accessToken) {

        user[k] = accessToken[k];

      }

      req.session.oauthUser = user;

      redirect(res, referer);

    }