function(){
        var resData = JSON.parse(data),
            out = redmine.translate(resData);
        callback(out);
      }