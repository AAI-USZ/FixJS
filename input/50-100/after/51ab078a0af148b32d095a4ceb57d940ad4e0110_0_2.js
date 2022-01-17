function(req, res) {
          if (req.is('json')) {
              res.json({ reason:"Permission Denied", status:403 }, 403);
              return;
          }
        res.render('permission_denied', {
          title:"Permission Denied",
          status: 403
        });
      }