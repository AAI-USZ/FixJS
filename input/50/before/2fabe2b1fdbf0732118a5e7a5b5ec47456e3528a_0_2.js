function(index){
        var context = jQuery(this);
        var item = context.val();
        if(existingTags.indexOf(item) === -1){
          existingTags.push(item);
        }
      }