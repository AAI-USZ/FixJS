function(){
        try {
        var resData = JSON.parse(data),
            out = redmine.translate(resData);
        } catch (err) {
          console.log("Got a parsing error: " + err.message);
          out = {redmine: [], error: err.message};
        }
        callback(out);
      }