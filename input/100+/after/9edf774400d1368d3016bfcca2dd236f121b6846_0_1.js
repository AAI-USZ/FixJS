function(fileName) {
  var extension = path.extname(fileName).substring(1);

  if (fileName.match(/[\/\\]_posts[\/\\]/)) {
    return 'post ' + extension;
  } else if (fileName.match(/[\/\\]_layouts[\/\\]/)) {
    return 'layout ' + extension;
  } else if (fileName.match(/[\/\\]_includes[\/\\]/)) {
    return 'include ' + extension;
  } else if (['jade', 'ejs', 'styl'].indexOf(extension) !== -1) {
    return 'file ' + extension;
  } else {
    return 'file';
  }
}