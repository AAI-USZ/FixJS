function Uploader(folder) {
    var id      = folder.id;
    // folder view that this uploader belongs to
    this.folder = folder;
    // plupload do the real work
    window.uploader = this.uploader = new plupload.Uploader({
        runtimes : 'html5,flash,html4',
        browse_button : 'uploader-' + id,
        //drop_element: 'papers-'+id,
        container: 'papers-'+id,
        max_file_size : '10mb',
        url : '/metadata',
        multipart_params: {
          tag: folder.getName() 
        },
        flash_swf_url : 'plupload/plupload.flash.swf',
        filters : [
            {title : "PDF files", extensions : "pdf"}
        ]
    });  
  }