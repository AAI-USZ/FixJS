function(err, data) {
            console.log("presenting page");
            params.restaurants = data;
            res.render("Event/index.jade", params);
          }