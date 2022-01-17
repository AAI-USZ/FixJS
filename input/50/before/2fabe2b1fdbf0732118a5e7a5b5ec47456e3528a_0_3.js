function(index){
        var val = this.trim();
        if(val && existingTags.indexOf(val) === -1){
          existingTags.push(val);
        }
      }