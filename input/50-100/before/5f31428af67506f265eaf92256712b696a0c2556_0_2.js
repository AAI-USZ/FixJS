function(x, attr) {
             if (jQuery.isPlainObject(attr)) {
               if (attr.selected == '') {
                  $('#'+i).append('<option value=\''+attr.value+'\'  >'+attr.text+'</option>');
               } else {
                  $('#'+i).append('<option value=\''+attr.value+'\' selected=\'selected\' >'+attr.text+'</option>');
               }
             } else { $('#'+i).attr(x, attr); }   
       }