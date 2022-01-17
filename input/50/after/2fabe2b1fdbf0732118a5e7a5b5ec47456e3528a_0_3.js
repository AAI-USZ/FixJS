function(index){
        var val = this.trim();
        if(val && jQuery.inArray(val, existingTags) === -1){
          existingTags.push(val);
        }
      }