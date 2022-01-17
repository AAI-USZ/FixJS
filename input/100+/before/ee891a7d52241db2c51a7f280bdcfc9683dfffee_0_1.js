function(context, element, extra, colorObj, isMulti)
    {
        if (this.doNotHighlight(element))
            return;

        // if a single color was passed in lets use it as the border color
        if (typeof colorObj === "string")
            colorObj = {background: "transparent", border: colorObj};
        else
            colorObj = colorObj || {background: "transparent", border: "highlight"};

        Firebug.Inspector.attachRepaintInspectListeners(context, element);
        storeHighlighterParams(this, context, element, null, colorObj, null, isMulti);

        var cs;
        var offset = Dom.getLTRBWH(element);
        var x = offset.left, y = offset.top;
        var w = offset.width, h = offset.height;

        if (FBTrace.DBG_INSPECT)
            FBTrace.sysout("FrameHighlighter HTML tag:" + element.tagName + " x:" + x +
                " y:" + y + " w:" + w + " h:" + h);

        var wacked = isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h);
        if (wacked)
        {
            if (FBTrace.DBG_INSPECT)
                FBTrace.sysout("FrameHighlighter.highlight has bad boxObject for " + element.tagName);

            return;
        }

        if (element.tagName !== "AREA")
        {
            if (FBTrace.DBG_INSPECT)
                FBTrace.sysout("FrameHighlighter " + element.tagName);
            var body = getNonFrameBody(element);
            if (!body)
                return this.unhighlight(context);

            this.ihl && this.ihl.show(false);

            quickInfoBox.show(element);
            var highlighter = this.getHighlighter(context, isMulti);
            var bgDiv = highlighter.firstChild;
            var css = moveImp(null, x, y) + resizeImp(null, w, h);

            cs = body.ownerDocument.defaultView.getComputedStyle(element, null);

            if (cs.MozTransform && cs.MozTransform != "none")
                css += "-moz-transform: "+cs.MozTransform+"!important;" +
                       "-moz-transform-origin: "+cs.MozTransformOrigin+"!important;";
            if (cs.borderRadius)
                css += "border-radius: "+cs.borderRadius+"!important;";
            if (cs.borderTopLeftRadius)
                css += "border-top-left-radius: "+cs.borderTopLeftRadius+"!important;";
            if (cs.borderTopRightRadius)
                css += "border-top-right-radius: "+cs.borderTopRightRadius+"!important;";
            if (cs.borderBottomRightRadius)
                css += "border-bottom-right-radius: "+cs.borderBottomRightRadius+"!important;";
            if (cs.borderBottomLeftRadius)
                css += "border-bottom-left-radius: "+cs.borderBottomLeftRadius+"!important;";

            css += "box-shadow: 0 0 2px 2px "+
                (colorObj && colorObj.border ? colorObj.border : "highlight")+"!important;";

            if (colorObj && colorObj.background)
            {
                bgDiv.style.cssText = "width: 100%!important; height: 100%!important;" +
                    "background-color: "+colorObj.background+"!important; opacity: 0.6!important;";
            }
            else
            {
                bgDiv.style.cssText = "background-color: transparent!important;";
            }

            highlighter.style.cssText = css;

            var needsAppend = !highlighter.parentNode || highlighter.ownerDocument != body.ownerDocument;
            if (needsAppend)
            {
                if (FBTrace.DBG_INSPECT)
                    FBTrace.sysout("FrameHighlighter needsAppend: " + highlighter.ownerDocument.documentURI +
                        " !?= " + body.ownerDocument.documentURI, highlighter);

                attachStyles(context, body);

                try
                {
                    body.appendChild(highlighter);
                }
                catch(exc)
                {
                    if (FBTrace.DBG_INSPECT)
                        FBTrace.sysout("inspector.FrameHighlighter.highlight body.appendChild FAILS for body " +
                            body + " " + exc, exc);
                }

                // otherwise the proxies take up screen space in browser.xul
                if (element.ownerDocument.contentType.indexOf("xul") === -1)
                    createProxiesForDisabledElements(body);
            }
        }
        else
        {
            this.ihl = getImageMapHighlighter(context);
            this.ihl.highlight(element, false);
        }
    }