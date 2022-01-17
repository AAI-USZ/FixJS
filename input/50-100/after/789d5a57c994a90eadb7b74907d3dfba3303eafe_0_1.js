function(){
        try {
        var resData = JSON.parse(data),
            out = cashboard.translate(resData);
        } catch (err) {
          console.log("Got a parsing error: " + err.message);
          out = {cashboard: [], error: err.message};
        }
        callback(out);
      }