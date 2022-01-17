function(query, isGeo, page, callback) {
  
  if (!query) {
    callback('No arguments were given to the freesound job', null);
    return;
  }
  
  //Replace spaces
  var query = query.replace(/\s/g,'+');
  //Store if we search for sounds with geolocation
  var isGeo = isGeo;
  
  //The array for storing the results
  var results = new Array();
  //maximum count of images to retrieve
  var maxResults = 8;
  //page stuff
  var end = page * maxResults;
  var start = end - maxResults;
  var soundPage = Math.ceil(end / 30);
  
  var freesoundURL = "http://www.freesound.org/api/sounds/search?"
    + 'q=' + query
    + '&p=' + soundPage
    + '&api_key=' + APIKey
    + '&format=json';
   
  if (isGeo === 1) {
    //If we want geotagged sounds
    freesoundURL += '&f=is_geotagged:true';
  }
  
  //DEBUG:
  //console.log(freesoundURL);

  restler
  .get(freesoundURL, {
    parser: restler.parsers.json
  })
  .on('success', function(data) {
    try { 
      
      //No sounds found, get back
      if(!data.sounds) {
        callback(null, results);
        return;
      }
      
      if(data.sounds.length < 1) {
        callback(null, results);
        return;
      }
      
      var sounds = data.sounds || new Array();
      
      //Adjust the maxResults parameter if there weren't enough results
      if(sounds.length < end) {
        end = sounds.length;
      }
      
      //Fetch sound info for all sounds below the maximum of sounds to retrieve   
      for(var i=start; i < end; i++) {         
        step(
          function initialize() {
            getSoundData(sounds[i].id, this);
          },
          function assemble(error, sounditem) {
            if(error) {
              console.log("Freesound error: " + error);
              maxResults--;
            } else {
              results.push(sounditem);
            }
            if (results.length === end) {
              //Exit the job if we're done, i.e Array full
              callback(null, results);
            }
          }
        ); //End step
      }
    } catch (error) {
      callback(error, null);
    }
  })
  .on('error', function(data,response) {
    callback(response.message, null);
  }); 
}