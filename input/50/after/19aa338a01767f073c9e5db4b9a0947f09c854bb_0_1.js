function(e) {
          remaining--;

          if(remaining === 0){
            callback.call(context, deleted);
          }
        }