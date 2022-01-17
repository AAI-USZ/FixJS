function getTitle(mdown){
    var match = getHeaderRegExp(_headingLevel - 1).exec(mdown); //H1
    return match? match[1].trim() : '';
}