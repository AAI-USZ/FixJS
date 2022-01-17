function()
    {
        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.FireCookiePanel.destroyNode");

        this.document.removeEventListener("mouseclick", this.onMouseClick, true);
        this.document.removeEventListener("mousedown", this.onMouseDown, true);
        this.document.removeEventListener("mousemove", this.onMouseMove, true);
        this.document.removeEventListener("mouseup", this.onMouseUp, true);
        this.document.removeEventListener("mouseout", this.onMouseOut, true);

        this.panelNode.removeEventListener("contextmenu", this.onContextMenu, false);
    }