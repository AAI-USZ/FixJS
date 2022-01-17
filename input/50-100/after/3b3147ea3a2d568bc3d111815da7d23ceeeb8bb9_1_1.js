function(doc, xpath)
{
    var result = Xpath.evaluateXPath(doc, xpath);

    if (result instanceof Array)
        return result;

    return [];
}