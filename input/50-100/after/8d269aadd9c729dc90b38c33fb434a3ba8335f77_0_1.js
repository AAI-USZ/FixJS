function getNonFrameBody(elt)
{
    if (Dom.isRange(elt))
    {
        elt = elt.commonAncestorContainer;
    }
    var body = Dom.getBody(elt.ownerDocument);
    return (body.localName && body.localName.toUpperCase() === "FRAMESET") ? null : body;
}