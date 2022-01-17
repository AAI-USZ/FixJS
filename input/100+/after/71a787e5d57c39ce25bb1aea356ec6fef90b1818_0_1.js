function(req, res) {
      var data, message, transport;
      data = req.body;
      transport = nodemailer.createTransport("SMTP", {
        service: 'Gmail',
        auth: {
          user: '',
          pass: ''
        }
      });
      message = {
        from: "" + data.name + " <" + data.email + ">",
        to: 'Craig <craig@craigmaslowski.com>',
        subject: "Email from " + data.name + " " + data.email + " via craigmaslowski.com",
        headers: {
          'X-Laziness-level': 1000
        },
        text: data.message
      };
      return transport.sendMail(message, function(error) {
        if (error) {
          res.json({
            result: 'failure',
            error: error
          }, 500);
        } else {
          res.json({
            result: 'success'
          });
        }
        return transport.close();
      });
    }