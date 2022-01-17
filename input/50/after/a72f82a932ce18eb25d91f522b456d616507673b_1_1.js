function(jqXHR, textStatus) {
        
        //Revert message
        interface_update_content('current_upload_filename', 'No Uploads in Progress');
        interface_hide('current_upload_filename');
        
        //Recursive callback
        queue_process();
      }