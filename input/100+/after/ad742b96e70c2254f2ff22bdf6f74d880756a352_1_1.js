function (er, cr, data) {
      if (er || cr.statusCode >= 400) {
        if (er) return res.error(er)
        return res.error(cr.statusCode, data.error)
      }

      // ok, it's a valid user
      // send an email to them.
      var email = data.email
      if (!email) {
        return res.error(400, 'Bad user, no email')
      }

      // the token needs to be url-safe.
      var token = crypto.randomBytes(30).toString('base64')
                  .split('/').join('_')
                  .split('+').join('-')
      , hash = sha(token)
      , data = { name: name, email: email, token: token }
      , key = 'pwrecover_' + hash

      config.redis.client.hmset(key, data)
      var u = 'https://' + req.headers.host + '/forgot/' + encodeURIComponent(token)
      mailer.sendMail
        ( { to: '"' + name + '" <' + email + '>'
          , from: 'user-account-bot@npmjs.org'
          , subject : "npm Password Reset"
          , headers: { "X-SMTPAPI": { category: "password-reset" } }
          , text: "You are receiving this because you (or someone else) have "
            + "requested the reset of the '"
            + name
            + "' npm user account.\r\n\r\n"
            + "Please click on the following link, or paste this into your "
            + "browser to complete the process:\r\n\r\n"
            + "    " + u + "\r\n\r\n"
            + "If you received this in error, you can safely ignore it.\r\n"
            + "The request will expire shortly.\r\n\r\n"
            + "You can reply to this message, or email\r\n    "
            + from + "\r\nif you have questions."
            + " \r\n\r\nnpm loves you.\r\n"
          }
        , done
        )

      function done (er, result) {
        // now the token is in redis, and the email has been sent.
        if (er) return res.error(er)
        res.template('password-recovery-submitted.ejs')
      }
    }