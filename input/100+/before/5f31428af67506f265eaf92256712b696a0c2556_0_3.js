function( event, ui ) {
            var page = jQuery.parseJSON($('#page_size :selected').val());
            var position = $('#img_label .ui-wrapper').position();
            var style=fix_style(position);
            var img=ui.draggable.find('img').attr('src');
            var json = "{ "
               json += '"code":"'+$code+'",';
               json += '"width":"'+$('#img_label').width()+'px",';
               json += '"height":"'+$('#img_label').height()+'px",';
               json += '"x":"'+page.x+'",';
               json += '"y":"'+page.y+'",';
               json += '"img_style":"'+style+'",';
               json += '"img":"'+img+'"';
               json += "}";
            var $put=url+'/feed/'+$('#list_name :selected').val();
            $.ajax({
               url: $put,
               type: 'PUT',
               processData: false,
               data: json,
               dataType: 'json',
               success: function(result) {
                 add_select_list(result);
                 $("#current").selectable().selectable( "refresh" );
               }
            });
         }