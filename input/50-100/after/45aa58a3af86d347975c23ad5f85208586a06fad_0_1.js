function (err) {
                if (err) {
                  log.warn('Error updating Proxy! - ' + err);
                }
                return res.json({
                  status: "success",
                  message: "Domain added."
                }, 200);
              }