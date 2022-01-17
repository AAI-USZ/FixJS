function getNonFrameBody(elt)
{
    var body = Dom.getBody(elt.ownerDocument);
    return (body.localName && body.localName.toUpperCase() === "FRAMESET") ? null : body;
}