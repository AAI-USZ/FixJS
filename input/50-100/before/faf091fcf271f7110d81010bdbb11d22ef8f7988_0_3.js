function(pos) {
        console.log(pos);
        if (NewCommentsHighlighter.new_comment_boxes.length == 0){
            return;
        }
        if (pos > 0){
             NewCommentsHighlighter.presentCommentMarker = pos - 1;
        }
        var comment = NewCommentsHighlighter.new_comment_boxes[NewCommentsHighlighter.presentCommentMarker];
        console.log(comment);
        window.scroll(0, NewCommentsHighlighter.findPos(comment)); 
    }