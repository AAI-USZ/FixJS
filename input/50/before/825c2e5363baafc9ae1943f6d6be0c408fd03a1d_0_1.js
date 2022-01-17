function() {
    var excerpt = $(this).closest('.post-excerpt');
    wantsToComment = true;
    excerpt.find('.show-more').click();
  }