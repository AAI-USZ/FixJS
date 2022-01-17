function(elementArr, context, highlightType, boxFrame, colorObj)
    {
        var i, elt, elementLen, oldContext, usingColorArray;
        var highlighter = highlightType ? getHighlighter(highlightType) : this.defaultHighlighter;

        if (!elementArr || !FirebugReps.Arr.isArray(elementArr, context.window))
        {
            // highlight a single element
            if (!elementArr || !Dom.isElement(elementArr) ||
                (Wrapper.getContentView(elementArr) &&
                    !Xml.isVisible(Wrapper.getContentView(elementArr))))
            {
                elementArr = (elementArr && elementArr.nodeType == Node.TEXT_NODE) ?
                    elementArr.parentNode : null;
            }

            if (elementArr && context && context.highlightTimeout)
            {
                context.clearTimeout(context.highlightTimeout);
                delete context.highlightTimeout;
            }

            oldContext = this.highlightedContext;
            if (oldContext && oldContext.window)
                this.clearAllHighlights();

            // Stop multi element highlighting
            if (!elementArr)
                this.repaint.element = null;

            this.highlighter = highlighter;
            this.highlightedContext = context;

            if (elementArr)
            {
                if (!isVisibleElement(elementArr))
                    highlighter.unhighlight(context);
                else if (context && context.window && context.window.document)
                    highlighter.highlight(context, elementArr, boxFrame, colorObj, false);
            }
            else if (oldContext)
            {
                oldContext.highlightTimeout = oldContext.setTimeout(function()
                {
                    if (FBTrace.DBG_INSPECT)
                        FBTrace.sysout("Removing inspector highlighter due to setTimeout loop");

                    if (!oldContext.highlightTimeout)
                        return;

                    delete oldContext.highlightTimeout;

                    if (oldContext.window && oldContext.window.document)
                    {
                        highlighter.unhighlight(oldContext);

                        if (oldContext.inspectorMouseMove)
                        {
                            Events.removeEventListener(oldContext.window.document, "mousemove",
                                oldContext.inspectorMouseMove, true);
                        }
                    }
                }, inspectDelay);
            }
        }
        else
        {
            // Highlight multiple elements
            if (context && context.highlightTimeout)
            {
                context.clearTimeout(context.highlightTimeout);
                delete context.highlightTimeout;
            }

            this.clearAllHighlights();
            usingColorArray = FirebugReps.Arr.isArray(colorObj, context.window);

            if (context && context.window && context.window.document)
            {
                for (i=0, elementLen=elementArr.length; i<elementLen; i++)
                {
                    elt = elementArr[i];

                    if (elt && elt instanceof HTMLElement)
                    {
                        if (elt.nodeType == Node.TEXT_NODE)
                            elt = elt.parentNode;

                        var obj = usingColorArray ? colorObj[i] : colorObj;
                        highlighter.highlight(context, elt, null, obj, true);
                    }
                }
            }

            storeHighlighterParams(null, context, elementArr, null, colorObj, highlightType, true);
        }
    }