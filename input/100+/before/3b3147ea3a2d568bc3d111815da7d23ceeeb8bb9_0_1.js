function(xpath) // returns unwrapped elements from the page
    {
        return Xpath.getElementsByXPath(Wrapper.unwrapObject(context.baseWindow.document), xpath);
    }