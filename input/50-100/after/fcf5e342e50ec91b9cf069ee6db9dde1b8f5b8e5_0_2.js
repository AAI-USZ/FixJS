function() {
    fileExplorer.busy();
    $('#message').text('User clicked update link.');
    setTimeout(function() {
      // render new directory structure
      fileExplorer.structure = dirSlightlyAlteredAndInJSON;
      fileExplorer.render();

      // re-bind drag-and-drop behavior
      fileExplorer.initDragAndDrop();

      fileExplorer.idle();
      $('#message').text('');
    }, 1000);
  }