function set_ui() {
      $.ajax({
         url: url+"/ui.json?"+$lang,
         type: 'GET',
         processData: false,
         dataType: 'json',
         success:function(j) {
            clear_ui();
            $.each(j, function(i, item) {
               $.each(item, function(x, attr) {
                  if (jQuery.isPlainObject(attr)) {
                     if (attr.selected == '') {
                        $('#'+i).append('<option value=\''+attr.value+'\'  >'+attr.text+'</option>');
                     } else {
                        $('#'+i).append('<option value=\''+attr.value+'\' selected=\'selected\' >'+attr.text+'</option>');
                     }
                  } else {
                     if (x == 'text') {
                        $('#'+i).text( attr); 
                     } else {
                        $('#'+i).attr(x, attr);  
                     }                     
                  }
               });
            });
         },
         statusCode: error
      });
   }