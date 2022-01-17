function(error, data) {
      if(error) {
        console.log('No weather data found for video with name "' + result.Name + '"');
      } else {
        result.Weather = data;
      }
      //Ok, got everything here so return the result
      callback(null, result);
    }