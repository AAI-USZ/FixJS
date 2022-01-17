function(error, auth_user) {

		if (error) {

      return next(error);

    }

		// get user info

		tapi.verify_credentials(auth_user, function(error, t_user) {

			if (error) {

        return next(error);

      }

			for (var k in auth_user) {

				t_user[k] = auth_user[k];

			}

      req.session.oauthUser = t_user;

      redirect(res, referer);

		});

	}