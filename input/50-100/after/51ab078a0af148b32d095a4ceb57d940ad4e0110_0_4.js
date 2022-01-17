function(req, res) {
          if (req.is('json')) {
              res.json({ reason:"Module Denied", status:503 }, 503);
              return;
          }
        res.render('module_disabled', {
          title:"Module Denied",
          status: 503
        });
      }