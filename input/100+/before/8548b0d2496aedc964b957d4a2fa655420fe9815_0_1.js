function onPanelClick(event)
{
    var repNode = Firebug.getRepNode(event.target);
    if (repNode)
    {
        var object = repNode.repObject;
        var rep = Firebug.getRep(object, Firebug.currentContext);
        var realObject = rep ? rep.getRealObject(object, Firebug.currentContext) : null;
        var realRep = realObject ? Firebug.getRep(realObject, Firebug.currentContext) : rep;
        if (!realObject)
            realObject = object;

        if (Events.isLeftClick(event))
        {
            if (Css.hasClass(repNode, "objectLink"))
            {
                if (realRep)
                {
                    realRep.inspectObject(realObject, Firebug.currentContext);
                    Events.cancelEvent(event);
                }
            }
        }
        else if (Events.isControlClick(event) || Events.isMiddleClick(event))
        {
            if (!realRep || !realRep.browseObject(realObject, Firebug.currentContext))
            {
                if (rep && !(rep != realRep && rep.browseObject(object, Firebug.currentContext)))
                {
                    var panel = Firebug.getElementPanel(event.target);
                    if (!panel || !panel.browseObject(realObject))
                        return;
                }
            }
            Events.cancelEvent(event);
        }
    }
}