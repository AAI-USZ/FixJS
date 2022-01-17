function(oldPanelNode)
    {
        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.CookiePanel.initializeNode");

        // xxxHonza 
        // This method isn't called when FB UI is detached. So, the columns
        // are *not* resizable when FB is open in external window.

        // Register event handlers for table column resizing.
        this.document.addEventListener("click", this.onMouseClick, true);
        this.document.addEventListener("mousedown", this.onMouseDown, true);
        this.document.addEventListener("mousemove", this.onMouseMove, true);
        this.document.addEventListener("mouseup", this.onMouseUp, true);
        this.document.addEventListener("mouseout", this.onMouseOut, true);

        this.panelNode.addEventListener("contextmenu", this.onContextMenu, false);
    }