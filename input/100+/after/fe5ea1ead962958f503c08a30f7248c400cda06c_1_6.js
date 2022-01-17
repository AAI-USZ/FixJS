function removeCommentContent (startCommentElement, endCommentElement)
    {
        var sibling = startCommentElement.nextSibling,
            nextSibling;

        while (sibling && sibling !== endCommentElement) {
            nextSibling = sibling.nextSibling;
            databindings.databind.removeBindings(sibling);
            $(sibling).remove();
            sibling = nextSibling;
        }
    }