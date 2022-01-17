function(){
        var resData = JSON.parse(data),
            out = cashboard.translate(resData);
        callback(out);
      }