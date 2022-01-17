function(mdown, headingLevel){
    mdown = normalizeLineBreaks(mdown);
    _headingLevel = (headingLevel || 2);

    var toc = getTocData(mdown);

    return {
        toc : toc,
        html :  parseContent(mdown, toc),
        title : getTitle(mdown)
    };
}