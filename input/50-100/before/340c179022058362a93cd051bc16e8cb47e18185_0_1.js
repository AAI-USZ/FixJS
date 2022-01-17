function( data ) {           
          if (!data) {
            $('#directory_user_result').html('User id ('+un+ ') does not exist.'); 
            $('#new_user_name_skel').select();

          }
          else {
            $('#new_permission_user').attr('disabled', false);
          }
        }