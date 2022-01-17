function() {

  /*
   * Globals
   */

  //server_url defined in index.php
  debug_mode = true;

  //Current directory
  currpath = (window.location.href).substr(server_url.length) + '/';

  /*
   * Initial Setup
   */
  interface_check_required_elements();
  setup_layout();
  initialize_queue();
  initialize_filemgr();
  
  
  /*
   * Event handlers
   */
  
  //Window resize...
  $(window).resize(setup_layout);
  
  //Drag files over queue
  $('body').bind('dragenter dragover dragexit drop', function(e) { e.preventDefault(); });
  $('#upload_queue').bind('dragenter', queue_drag_handler);
  $('#upload_queue').bind('dragover', queue_drag_handler);
  $('#upload_queue').bind('dragexit', queue_dragexit_handler);

  //Drop files into queue
  $('#upload_queue').bind('drop', queue_drop_handler);  
  
  //Start processing queue
  $('#current_upload').bind('click', queue_process);

  //Click on file link
  $("#filemgr #filelist").on('click', 'li.file > a', filemgr_view_file);
  $('#filemgr').on('click', '#filedetails .filedetailsclose', filemgr_close_file);

  //Try to navigate away
  window.onbeforeunload = function() {
    if (get_queue_state() != 'ready') {
      alert("The queue is currently processing!  Navigating away from this page will destroy your current uploads.  Are you sure you want to do this?");
    }
    if (get_queue_count() > 0) {
      alert("If you leave this page, your files will not be uploaded.  Are you sure you want to do this?");
    }
  };

}