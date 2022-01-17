function(req, res) {
      var data;
      data = req.body;
      return email.send({
        host: "smtp.sendgrid.net",
        port: "25",
        domain: "smtp.sendgrid.net",
        authentication: "login",
        username: '',
        password: '',
        to: "craig@craigmaslowski.com",
        from: data.email,
        subject: "Email from " + data.name + " via craigmaslowski.com",
        body: data.message
      }, function(err, result) {
        if (err) {
          return res.json({
            result: 'failure',
            error: err
          }, 500);
        } else {
          return res.json({
            result: 'success'
          });
        }
      });
      /*
          server = email.server.connect({
            user: '', 
            password: '',
            host: 'smtp.sendgrid.net', 
            ssl: false
          })
          
          headers = {
            text: data.message, 
            from: "#{data.name} <#{data.email}>", 
            to: 'Craig <craig@craigmaslowski.com>',
            subject: "Email from #{data.name} via craigmaslowski.com"
          }
          
          message = email.message.create(headers)
      
          server.send(message, (err, result) -> 
            if (err)
              res.json {result: 'failure', error: err}, 500
            else
              res.json {result: 'success'}
          )
      */

    }