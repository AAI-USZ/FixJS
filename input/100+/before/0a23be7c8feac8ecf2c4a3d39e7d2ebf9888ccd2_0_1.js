function appendComment(comment) {
    var user = getUser(comment.user_id);
    comment.message = simple_format(comment.message)
    $('#post_'+comment.parent_id+' .comments').append('<div class="comment" id="comment_'+comment.id+'">'+
        '<h4 class="name"><a href="/users/'+user.id+'">'+user.full_name+'</a></h4>'+
        '<div class="message">'+comment.message+'</div>'+
        '<span class="date">'+
        '<abbr class="timeago" title="'+comment.created_at+'">'+
            comment.created_at+
        '</abbr>'+
        '</span>'+
        ' <a class="btn btn-mini" onclick="editComment($(this).parents(\'.comment\'))"><i class="icon-pencil"></i> Edit</a>'+
        ' <a class="btn btn-mini btn-danger" onclick="deleteComment($(this).parents(\'.comment\'))"><i class="icon-remove"></i> Delete</a>'+
        '</div>');
    $('#comment_'+comment.id+' .timeago').timeago();
    if(comment.message.length > 300) {
        $('#comment_'+comment.id+' .message')
            .html(comment.message.substring(0,300)+"...")
            .after('<a class="message_toggle">[ More ]</a><div class="orig_message">'+comment.message+'</div>');
        initMessageToggle();
    }

    $('#comment_'+comment.id+' .message').linkify();
}