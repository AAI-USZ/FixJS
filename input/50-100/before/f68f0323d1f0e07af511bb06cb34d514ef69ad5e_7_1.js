function(date, format) {
      if (!date || !format){
        console.log("Not enough params");
      }

      var res = date.toString(format);

      console.log("Formatted date: " + res);

      return res;
    }