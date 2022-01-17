function(xpath, contextNode, resultType) // returns unwrapped elements from the page
    {
        var XPathResultType = XPathResult.ANY_TYPE;

        switch (resultType)
        {
            case "number":
                XPathResultType = XPathResult.NUMBER_TYPE;
                break;

            case "string":
                XPathResultType = XPathResult.STRING_TYPE;
                break;

            case "bool":
                XPathResultType = XPathResult.BOOLEAN_TYPE;
                break;

            case "node":
                XPathResultType = XPathResult.FIRST_ORDERED_NODE_TYPE;
                break;
                
            case "nodes":
                XPathResultType = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
                break;
        }

        var doc = Wrapper.unwrapObject(context.baseWindow.document);
        
        return Xpath.evaluateXPath(doc, xpath, contextNode, XPathResultType);
    }