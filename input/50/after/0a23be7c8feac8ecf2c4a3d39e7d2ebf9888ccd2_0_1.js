function() {
        $(this).nextAll('.comment-hidden').slideDown().removeClass('comment-hidden');
        $(this).remove();
    }