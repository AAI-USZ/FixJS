function(index, howMany, removedArray, isLocal){
          for( var i = 0; i < removedArray.length; i++ ){
            var removedEnt = removedArray[i];
            var id = removedEnt.id;

            fn(id);
          }
        }