function(mdown, headingLevel){
    mdown = normalizeLineBreaks(mdown);
    _headingLevel = (headingLevel || 2);

    var result = parseContent(mdown);

    return {
        toc : result.toc,
        html :  result.html,
        title : getTitle(mdown)
    };
}