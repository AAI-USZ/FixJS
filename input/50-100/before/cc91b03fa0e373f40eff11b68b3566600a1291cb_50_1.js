function(sourceBox, viewRange)
    {
        try
        {
            this.updateViewportCache(sourceBox, viewRange);
        }
        catch(exc)
        {
            if(FBTrace.DBG_ERRORS)
                FBTrace.sysout("buildViewAround updateViewportCache FAILS "+exc, exc);
        }

        Dom.collapse(sourceBox, false); // the elements must be visible for the offset values
        this.setViewportPadding(sourceBox, viewRange);

        sourceBox.centralLine = Math.floor( (viewRange.lastLine + viewRange.firstLine)/2 );

        this.applyDecorator(sourceBox);

        return;
    }