function renderEntries(entries){
    var dayContent = '';
    $.each(
      entries,
      function(idx, entry){
        var entryTitle = entry['title'];
        var entryUrl = entry['url'];
        requestHandler.addCall();
        $.ajax({
          url: entryUrl,
          type: "GET",
          error: function(xhr, statusText, errorThrown){
            alert(statusText);
            // Work out what the error was and display the appropriate message
          },
          success: function(data){
            dayContent += '<div class="post">'
                            + '<h3>' + entryTitle + '<h3>'
                            + '<div class="post-content">' + data + '</div>'
                          + '</div>';
            requestHandler.removeCall(dayContent);
          }
        });

      });
  }