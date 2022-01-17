function() {
         var img=$(this).find('img');
         var del=url+'/feed/'+$('#list_name').val()+'/?'+img.attr('id');
         //alert(del);
         $.ajax({
            url: del,
            type: 'DELETE',
            processData: false,
            data: del,
            dataType: 'json',
            success: function(result) {
               $('#current').empty();
               $.each(result, function(ii, p){
                  add_select_list(p);
               });
               $("#current").selectable().selectable( "refresh" );
            }
         });
      }