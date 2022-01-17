function(app) {
    app.get('/', function(req, res) {
      return res.render('index', {
        availability: {
          freelance: false,
          fullTime: false,
          openToContact: true
        }
      });
    });
    app.get('/resume', function(req, res) {
      return res.render('resume');
    });
    app.get('/about', function(req, res) {
      return res.render('about');
    });
    app.get('/projects', function(req, res) {
      return res.render('projects');
    });
    return app.post('/contact', function(req, res) {
      var data;
      return data = req.body;
      /*
          email.send({
            host: "smtp.sendgrid.net",
            port : "25",
            domain: "smtp.sendgrid.net",
            authentication: "login",
            username: 'craigmaslowski.com',
            password: '4ini.tech',
            to : "craig@craigmaslowski.com",
            from : data.email,
            subject : "Email from #{data.name} via craigmaslowski.com",
            body : data.message },
            (err, result) -> 
              if (err)
                res.json {result: 'failure', error: err}, 500
              else
                res.json {result: 'success'})
      
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
    });
  }