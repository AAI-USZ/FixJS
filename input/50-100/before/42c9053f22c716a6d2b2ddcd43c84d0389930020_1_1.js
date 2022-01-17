function(err, db) {
          /*
        Code for get_datum_ids/by_date
        
        function(doc) {
          if (doc.dateEntered) {
            emit(doc.dateEntered, doc.id);
          }
        }
           */
          
          db.query("get_datum_ids/by_date", {reduce: false}, function(err, response) {
            if ((!err) && (typeof callback == "function"))  {
              console.log("Callback with: ", response.rows);
              callback(response.rows)
            }
          });
        }