function(index){
        var context = jQuery(this);
        var item = context.val();
        if(jQuery.inArray(item, existingTags) === -1){
          existingTags.push(item);
        }
      }