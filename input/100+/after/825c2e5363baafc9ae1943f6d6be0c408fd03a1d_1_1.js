function(event) {
    event.preventDefault();
    var link = $(this);
    var post = link.closest('div.post, .post-excerpt');
    if( post.length ) {
      $.get(
        '/likes/posts/create/' + post.data('post-id'),
        function(response) {
          var h = $.parseJSON(response);
          link.addClass('hidden');
          link.siblings('a.unlike').removeClass('hidden').data('post-like-id', h['post_like_id']);
          /* TODO: Clean up this selector */
          var num_likes = post.find('.post-tools .num-likes, .post-stats .num-likes');
          num_likes.find('.value').text( h['num_likes'] );
          num_likes.attr('title', h['liked_by']);
          num_likes.show();
          if( post.find('.mark-unread.hidden').length ) {
            post.find('.mark-read').addClass('hidden');
            post.find('.mark-unread').removeClass('hidden');
          }
        }
      );
    }
  }