function(date, format) {
      if (!date || !format){
        console.log("Not enough params");
        return "";
      }

      var res = date.toString(format);

      console.log("Formatted date: " + res + " with format: " + format);

      return res;
    }