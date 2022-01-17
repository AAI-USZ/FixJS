function() {
    $('.post .message, .comment .message').linkify();
    $('#new_post')
        .bind('ajax:success', function(xhr, data, status) {
            prependPost(data);
            $('#new_post textarea').val('');
        });
    $('.new_comment_form')
        .bind('ajax:success', function(xhr, data, status) {
            appendComment(data);
            $('#post_'+data.parent_id+' .new_comment_form textarea').val('');
            $('#post_'+data.parent_id+' .add_comment').click();
        });
    $('.timeago').timeago();

    $('.add_comment').toggle(function() {
        $(this).nextAll('form.new_comment_form').stop().slideDown();
    }, function() {
        $(this).nextAll('form.new_comment_form').stop().slideUp();
    });

    $('.show_older_comments').click(function() {
        $(this).nextAll('.comment-hidden').show();
        $(this).remove();
    });

    initMessageToggle();
}