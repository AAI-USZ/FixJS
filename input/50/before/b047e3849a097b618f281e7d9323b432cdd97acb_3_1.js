function(error, weatherdata) {
          if(error) {
            console.log('No weather data found for sound with id ' + soundId);
          } else {
            result.Weather = weatherdata;
          }
          //Ok, got everything here so give the result back
          callback(null, result);
        }