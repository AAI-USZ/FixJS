function makeTransition(elemId, arrowId, closedHeight, openHeight) {
    return (function(){
        var closedHeight = 35;
        // relies on parseInt ignoring invalid trailing content
        var margin = parseInt($('.content').css('margin-top'), 10);
        var openHeight = $(elemId + ' .content').height() + margin;
        var elem = $(elemId), arrow = $(arrowId);
        if (elem.height() === closedHeight) {
            elem.addClass('clicked').height(openHeight);
            arrow.addClass('clicked');
        }
        else {
            elem.removeClass('clicked').height(closedHeight);
            arrow.removeClass('clicked');
        }
    });
}