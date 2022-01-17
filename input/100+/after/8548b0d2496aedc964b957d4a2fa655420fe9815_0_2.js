function onPanelMouseUp(event)
{
    if (Events.isLeftClick(event))
    {
        var selection = event.target.ownerDocument.defaultView.getSelection();
        var target = selection.focusNode || event.target;
        if (selection.focusNode === selection.anchorNode)
        {
            var editable = Dom.getAncestorByClass(target, "editable");
            if (editable || Css.hasClass(event.target, "inlineExpander"))
            {
                var selectionData;
                var selFO = selection.focusOffset,selAO = selection.anchorOffset;

                // selection is collapsed
                if (selFO == selAO)
                {
                    var distance = Math.abs(event.screenX - this.lastMouseDownPosition.x) +
                        Math.abs(event.screenY - this.lastMouseDownPosition.y);

                    // If mouse has moved far enough, set selection at that point
                    if (distance > 3)
                        selectionData = {start: selFO, end: selFO};
                    // otherwise leave selectionData undefined to select all text
                }
                else if (selFO < selAO)
                {
                    selectionData = {start: selFO, end: selAO};
                }
                else
                {
                    selectionData = {start: selAO, end: selFO};
                }

                if (editable)
                {
                    Firebug.Editor.startEditing(editable, null, null, selectionData);
                }
                else
                {
                    Firebug.Editor.setSelection(selectionData || {start: selFO, end: selFO});
                    selection.removeAllRanges();
                }

                Events.cancelEvent(event);
            }
        }
    }
    else if (Events.isControlClick(event) || Events.isMiddleClick(event))
    {
        var repNode = Firebug.getRepNode(event.target);
        if (!repNode)
            return;

        var object = repNode.repObject;
        var rep = Firebug.getRep(object, Firebug.currentContext);
        var realObject = rep ? rep.getRealObject(object, Firebug.currentContext) : null;
        var realRep = realObject ? Firebug.getRep(realObject, Firebug.currentContext) : rep;
        if (!realObject)
            realObject = object;

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