function (err, resp) {
            if (err) {
              res.json({
                status: "failure",
                message: err.error + ' - ' + err.reason
              }, 400);
            } else {
              res.json({
                status: "success",
                message: "Domain added."
              }, 200);
            }
          }