function(event) {
    event.preventDefault();
    var excerpt = $(this).closest('.post-excerpt');
    wantsToComment = true;
    excerpt.find('.show-more').click();
  }