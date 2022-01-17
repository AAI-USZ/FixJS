function queue_process() {

  //Get the next item in the queue.  If FALSE, then stop processing the queue
  if (get_queue_state() != 'cancelling') {
    set_queue_state('processing');
    interface_hide('upload_start');
  }
   
  var queue_item = queue_shift();
  
  if (queue_item != false && get_queue_state() == 'processing') {
    
    //Get the upload path from the currpath global combined
    //with the filename
    upload_path = currpath + queue_item.fileobject.name;

    //Upload the file    
    $.ajax({
      url: server_url + upload_path,
      data: queue_item.fileobject,
      cache: false,
      contentType: false,
      processData: false,
      type: 'PUT',
      beforeSend: function(jqXHR, settings) {
        
        //Set additional header for upload ID
        jqXHR.setRequestHeader("UploadFileId", queue_item.key);

        //Show a message
        interface_show('current_upload_filename');
        interface_update_content('current_upload_filename', 'Uploading ' + queue_item.fileobject.name);
        
        //Set a flag to indicate the current uploading file
        queue_set_current_upload_key(queue_item.key);
        
        //Start the progress meter
        queue_do_progress(queue_item.key);
      },
      success: function(data){
        console.log("Uploaded..." + data);
        queue_clear_current_upload_key();
        filemgr_get_file_list();
      },
      error: function(jqXHR, errortext) {
        console.log(jqXHR);
        console.log(errortext);
        queue_clear_current_upload_key();
      },
      complete: function(jqXHR, textStatus) {
        
        //Revert message
        interface_update_content('current_upload_filename', 'No Uploads in Progress');
        interface_hide('current_upload_filename');
        
        //Recursive callback
        queue_process();
      }
    });    
        
  }
  else {
    set_queue_state('ready');
    interface_show('upload_start');
  }
}