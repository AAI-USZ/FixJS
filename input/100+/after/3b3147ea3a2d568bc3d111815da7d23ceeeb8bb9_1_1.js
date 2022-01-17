function(doc, xpath, contextNode, resultType)
{
    if (contextNode === undefined)
        contextNode = doc;

    if (resultType === undefined)
        resultType = XPathResult.ANY_TYPE;

    try
    {
        var result = doc.evaluate(xpath, contextNode, null, resultType, null);
    }
    catch (exc)
    {
        // If an invalid XPath expression was entered, it should be caught without exception
        return;
    }

    switch (result.resultType)
    {
        case XPathResult.NUMBER_TYPE:
            return result.numberValue;

        case XPathResult.STRING_TYPE:
            return result.stringValue;
            
        case XPathResult.BOOLEAN_TYPE:
            return result.booleanValue;

        case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
        case XPathResult.ORDERED_NODE_ITERATOR_TYPE:
            var nodes = [];
            for (var item = result.iterateNext(); item; item = result.iterateNext())
                nodes.push(item);
            return nodes;
            
        case XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE:
        case XPathResult.ORDERED_NODE_SNAPSHOT_TYPE:
            var nodes = [];
            for (var i = 0; i < result.snapshotLength; ++i)
                nodes.push(result.snapshotItem(i));
            return nodes;
            
        case XPathResult.ANY_UNORDERED_NODE_TYPE:
        case XPathResult.FIRST_ORDERED_NODE_TYPE:
            return result.singleNodeValue;
    }
}