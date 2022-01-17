function( commitMessage ) {
  win.onbeforeunload = null;

  var POST = 'POST';
  var markdown = 'markdown';
  var txt = editorSession.getValue();
  var msg = defaultCommitMessage();

  var newLocation = location.protocol + '//' + location.host + baseUrl;
  if (pathName) {
    newLocation += '/' + pathName;
  }
  newLocation += '/' + pageName;

  // if &create=true then handle create instead of edit.
  if ( create ) {
    jQuery.ajax( {
      type: POST,
      url: baseUrl + '/create',
      data:  { path: pathName, page: pageName, format: markdown, content: txt, message: commitMessage || msg },
      success: function() {
        win.location = newLocation;
      }
  });
  } else {
    jQuery.ajax( {
      type: POST,
      url: baseUrl + '/edit/' + pageName,
      data:  { path: pathName, page: pageName, format: markdown, content: txt, message:  commitMessage || msg },
      success: function() {
          win.location = newLocation;
      }
    });
  } // end else
}