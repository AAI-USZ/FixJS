function(res, user) {
        console.log("registration successful");
        if (res.req.header('accept') === 'application/json') {
          console.log("from xhr");
          return res.json({
            success: true
          }, 200);
        } else {
          console.log("from http");
          return res.redirect("/");
        }
      }