function (file_info) {
    console.log('reloading resource', file_info.file_name);
    var file_type = 'text/javascript';
    switch (file_info.ext) {
      case '.css':
        file_type = 'text/css';
        break;
    }
    Live.refreshResource(file_info.file_name, file_type);
  }