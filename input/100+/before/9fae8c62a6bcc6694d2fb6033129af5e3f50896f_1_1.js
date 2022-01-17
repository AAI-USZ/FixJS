function() {
    $('[id^="comments-for-"]').each(function(index, element){
        var comments = new PostCommentsWidget();
        comments.decorate(element);
    });
    $('[id^="swap-question-with-answer-"]').each(function(idx, element){
        var swapper = new QASwapper();
        swapper.decorate($(element));
    });
    $('[id^="post-id-"]').each(function(idx, element){
        var deleter = new DeletePostLink();
        //confusingly .question-delete matches the answers too need rename
        var post_id = element.id.split('-').pop();
        deleter.setPostId(post_id);
        deleter.decorate($(element).find('.question-delete'));
    });
    questionRetagger.init();
    socialSharing.init();
}