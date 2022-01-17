function() {
      // render new directory structure
      fileExplorer.structure = dirSlightlyAlteredAndInJSON;
      fileExplorer.render();

      // re-bind drag-and-drop behavior
      $('.backbone-file-explorer-directory:not(:first)').bind('drag', dragHandler);
      $('.backbone-file-explorer-directory:not(:first)').bind('drop', dropHandler);

      fileExplorer.idle();
      $('#message').text('');
    }