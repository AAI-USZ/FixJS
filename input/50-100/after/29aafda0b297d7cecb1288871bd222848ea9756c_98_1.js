function(element, html)
{
    try
    {
        var doc = element.ownerDocument;
        var range = doc.createRange();
        range.selectNode(element || doc.documentElement);

        var fragment = range.createContextualFragment(html);
        var first = fragment.firstChild;
        var last = fragment.lastChild;
        element.parentNode.replaceChild(fragment, element);
        return [first, last];
    }
    catch (e)
    {
        return [element, element];
    }
}