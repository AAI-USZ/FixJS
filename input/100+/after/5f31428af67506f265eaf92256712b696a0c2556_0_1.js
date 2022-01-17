function add_project() {
      var p = $('#project_name').val();
      
      if (p == '') { $( this ).dialog( "close" ); }
      var $post = '{"project":"'+p+' " }';
      $.ajax({
         url: url+'/feed/',
         type: 'POST',
         processData: false,
         data: $post,
         dataType: 'json',
         success: function(result) {
            $('#list_name').prepend('<option value="'+p+'">'+p+'</option>');
            $('#http_error').remove();
         },
         statusCode: error
      });
   }