function isStartComment (element)
    {
        return (element.nodeType == 8) && (commentNodesHaveTextProperty ? element.text : element.nodeValue).match(startCommentRegex);
    }