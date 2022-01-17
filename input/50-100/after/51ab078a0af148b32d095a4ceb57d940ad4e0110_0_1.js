function(req, res) {
          if (req.is('json')) {
              res.json({ reason:"Page Not Found", status:404 }, 404);
              return;
          }
          res.render('not_found', {
            title:"Page Not Found",
            status: 404
          });
      }