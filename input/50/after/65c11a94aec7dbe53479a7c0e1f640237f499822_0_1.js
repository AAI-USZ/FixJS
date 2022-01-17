function(response) {
      previewContent.html(response[0].matches[0]);
      $('#preview').show();
    }