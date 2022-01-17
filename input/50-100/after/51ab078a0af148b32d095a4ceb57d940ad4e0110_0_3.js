function(req, res) {
          if (req.is('json')) {
              res.json({ reason:"Application Unavailable", status:503 }, 503);
              return;
          }
          
        res.render('application_unavailable', {
          title:"Application Unavailable",
          status: 503
        });
      }