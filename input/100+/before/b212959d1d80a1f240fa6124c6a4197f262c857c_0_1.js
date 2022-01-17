function(){  
     
     // Get the parent & make a copy of the template
     var parent = $(this).parent().parent();
     var append_after = parent.find('.opt-group').last();
     var container = $("#template-use .opt-group");
     var clone = container.clone(true); 
     
     // Set the number of times clicked
     var count = parseInt($('#use-count').attr('value'), 10);
     count = count + 1;
     $('#use-count').attr('value', count);
     console.log("count: " + $('#use-count').attr('value'));
     
     // Set IDs and name on form elements to match the count
     clone.find('input').each(function(index) {
       // First, remove old counts
       //$(this).attr('id', strip_count($(this).attr('id')));
       //$(this).attr('name', strip_count($(this).attr('name')));
       
       // Set counts
       $(this).attr('id', $(this).attr('id') + "-" + count);
       $(this).attr('name', $(this).attr('name') + "-" + count);
       
     });
     
     clone.find('.use-id').text(count);
     
     // Number the fieldsets
     clone.find('fieldset').each(function(index) {
       console.log("Updating fieldset");
       console.log($(this));
       console.log($(this).attr('id'));
       
       // remove old count
       //$(this).attr('id', strip_count($(this).attr('id')));
              
       // then, addd new count
       $(this).attr('id', $(this).attr('id') + "-" + count);
     });
     
     // Number the labels
     clone.find('label').each(function(index) {
       //$(this).attr('for', strip_count($(this).attr('for')));
       
       //$(this).attr('for', $(this).attr('for').split("-").slice(0, -1).join('-'));
       $(this).attr('for', $(this).attr('for') + "-" + count);
     });
     
     // Show the clone (the template is hidden by default)
     clone.show();
     clone.trigger("create");
     
     // Force jquery mobile to render the form elements
     clone.find('input').each(function(index,elt){
       $(this).removeAttr('data-role');
       $(this).trigger("create");
     });
      
     // Add the clone to the page
     console.log("APPEND AFTER ================");
     console.log(append_after);
     console.log(clone);
     append_after.after(clone);
     clone.trigger("create");
   }