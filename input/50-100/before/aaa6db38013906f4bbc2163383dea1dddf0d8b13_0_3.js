function() {
    $('.post .message, .comment .message').linkify();
    $('.timeago').timeago();

    $('.show_older_comments').click(function() {
        $(this).nextAll('.comment-hidden').slideDown().removeClass('comment-hidden');
        $(this).remove();
    });

    initMessageToggle();
}