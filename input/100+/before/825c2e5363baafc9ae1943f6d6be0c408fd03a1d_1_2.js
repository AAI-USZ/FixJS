function() {
    var link = $(this);
    var post = link.closest('div.post, .post-excerpt');
    if( post.length ) {
      $.get(
        '/likes/posts/destroy/' + link.data('post-like-id'),
        function(response) {
          var h = $.parseJSON(response);
          link.addClass('hidden');
          link.siblings('a.like').removeClass('hidden');
          /* TODO: Clean up this selector */
          var num_likes = post.find('.post-tools .num-likes, .post-stats .num-likes');
          num_likes.find('.value').text( h['num_likes'] );
          num_likes.attr('title', h['liked_by']);
          if( h['num_likes'] == 0 ) {
            num_likes.hide();
          }
        }
      );
    }
  }