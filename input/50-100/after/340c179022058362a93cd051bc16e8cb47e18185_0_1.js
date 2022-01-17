function( data ) {           
          if (!data) {
            $('#directory_user_result').html('User id ('+un+ ') does not exist.'); 
            $('#new_user_name_skel').select();
            $('#new_user_permission_skel').val('none');
            $('#new_user_permission_skel').attr('disabled', true);
            return;
          }
          else {
            $('#new_user_permission_skel').attr('disabled', false);
            $('#new_user_permission_skel').focus();
          }
        }