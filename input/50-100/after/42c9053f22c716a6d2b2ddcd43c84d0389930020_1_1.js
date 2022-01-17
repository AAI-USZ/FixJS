function(err, response) {
            if ((!err) && (typeof callback == "function"))  {
              console.log("Callback with: ", response.rows);
              callback(response.rows)
            }
          }