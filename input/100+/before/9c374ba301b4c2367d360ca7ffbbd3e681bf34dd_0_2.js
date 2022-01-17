function getContentOfEntries(entries){
    dayContent = '';
    var entry_calls = [];
    $.each(entries,
          function(){
            var title = this['title'];
            call = $.ajax({url:this['url']});
            call.done(function(data){
              dayContent += '<div class="post">'
                            + '<h3>' + title + '<h3>'
                            + '<div class="post-content">' + data + '</div>'
                          + '</div>';
            });
            entry_calls.push(call);
          });

    $.when.apply($, entry_calls);
  }