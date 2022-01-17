function(err, files) {
//        if (err) {
//          next(err, false);
//        }
//        else {
          // Send upload completed response to client.
          next(null, files);
//        }
      }