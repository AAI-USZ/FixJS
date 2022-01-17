function handleChildMouseEvents(e) {
        var control = this.getOwnerControl(e.target);
        if (control) {
            // Child control identified; forward the event.
            switch (e.type) {
                case "mousedown":
                    control.handleMouseDown(e);
                    break;
                case "mouseup":
                    control.handleMouseUp(e);
                    break;
                case "mouseover":
                    control.handleMouseOver(e);
                    break;
                case "mouseout":
                    control.handleMouseOut(e);
                    break;
                case "dblclick":
                    control.handleDblClick(e);
                    break;
                default:
                    S.error(e.type + " unhandled!");
            }
        }
    }