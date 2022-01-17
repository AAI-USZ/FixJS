function(err, data) {
            params.restaurants = data;
            res.render("Event/index.jade", params);
          }