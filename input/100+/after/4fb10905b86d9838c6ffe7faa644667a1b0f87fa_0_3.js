function(data) {
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
      var newArguments = [];
      var initializeClosure = function(soundID){
        return function initialize() {
          getSoundData(soundID, this);
        };
      };
      var assembleClosure = function assemble(error, sounditem) {
        if(error) {
          console.log("Freesound error: " + error);
          maxResults--;
        } else {
          results.push(sounditem);
        }
        if (results.length === end) {
          //Exit the job if we're done, i.e Array full
          callback(null, results);
        } else {
          this();
        }
      };
      for(var i=start; i < end; i++) {
        newArguments.push(
          initializeClosure(sounds[i].id),
          assembleClosure
        );
      }
      step.apply(step, newArguments);
    } catch (error) {
      callback(error, null);
    }
  }