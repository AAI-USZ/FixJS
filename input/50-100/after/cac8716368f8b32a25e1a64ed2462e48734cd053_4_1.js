function (file_info) {
    console.log('reloading resource', file_info.file_name);
    var file_type = 'text/javascript';
    if (file_info.ext === '.css') {
        file_type = 'text/css';
    }
    Live.refreshResource(file_info.file_name, file_type);
  }