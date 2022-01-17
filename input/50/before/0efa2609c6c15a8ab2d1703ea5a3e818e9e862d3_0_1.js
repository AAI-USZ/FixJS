function(err, data) {
            console.log("presenting page", err, data);
            params.restaurants = data;
            res.render("Event/index.jade", params);
          }