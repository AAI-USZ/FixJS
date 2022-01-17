function(index, val){
        if(jQuery.inArray(val, existingTags) === -1){
          existingTags.push(val);
        }
      }