function() {
      var connection = new Db("replicaset_test", new Server(self.host, self.mongods[node]["port"], {ssl:self.ssl, poolSize:1}));
      connection.open(function(err, db) {
        if(err == null && !done) {
          // Set done
          done = true;
          // Clear interval
          clearInterval(intervalId);
          // Callback as done
          return callback(null, connection);
        } else {
          // Close the connection
          if(connection != null) connection.close();
          // Adjust the number of retries
          numberOfRetries = numberOfRetries - 1;
          // If we have no more retries fail
          if(numberOfRetries == 0) {
            // Set done
            done = true;
            // Clear interval
            clearInterval(intervalId);
            // Callback as done
            return callback(new Error("Timed out connecting to primary"), null);
          }
        }
      });
    }