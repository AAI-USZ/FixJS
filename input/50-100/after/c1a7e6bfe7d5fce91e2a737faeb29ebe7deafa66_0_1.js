function(url, lineNumber, classes, tooltipText)
{
    var linkText = WebInspector.formatLinkText(url, lineNumber);
    var anchor = WebInspector.linkifyURLAsNode(url, linkText, classes, true, tooltipText);
    anchor.preferredPanel = "resources";
    anchor.lineNumber = lineNumber;
    return anchor;
}