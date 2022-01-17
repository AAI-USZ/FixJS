function(context, doc)
    {
        // xxxHonza
        // This initialization is made as soon as the Cookies panel
        // is opened the first time.
        // This means that columns are *not* resizeable within the console
        // (rejected cookies) till this activation isn't executed.

        // Initialize event listeners before the ancestor is called.
        var hcr = HeaderResizer;
        this.onMouseClick = Obj.bind(hcr.onMouseClick, hcr);
        this.onMouseDown = Obj.bind(hcr.onMouseDown, hcr);
        this.onMouseMove = Obj.bind(hcr.onMouseMove, hcr);
        this.onMouseUp = Obj.bind(hcr.onMouseUp, hcr);
        this.onMouseOut = Obj.bind(hcr.onMouseOut, hcr);

        this.onContextMenu = Obj.bind(this.onContextMenu, this);

        Firebug.ActivablePanel.initialize.apply(this, arguments);

        // Just after the initialization, so the this.document member is set.
        Firebug.CookieModule.addStyleSheet(this);

        this.refresh();
    }