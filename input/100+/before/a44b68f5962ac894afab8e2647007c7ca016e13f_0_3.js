function (index, duration, easing) {

        var paginator = this,
            host = paginator._host,
            axis = paginator.get(AXIS),
            duration = (duration !== undefined) ? duration : PaginatorPlugin.TRANSITION.duration,
            easing = (easing !== undefined) ? duration : PaginatorPlugin.TRANSITION.easing,
            pageNodes = paginator._getPageNodes(),
            scrollAxis, scrollVal;

        // // If the delta is 0 (a no-movement mouseclick)
        // if (delta === 0) {
        //     return false;
        // }

        // // Disable the UI while animating
        // if (duration > 0) {
        //     paginator._uiDisable();
        // }

        // Make sure the target node is visible
        // paginator._showNodes(pageNodes.item(index));

        // Determine where to scroll to
        if (axis === DIM_Y) {
            scrollAxis = SCROLL_Y;
            scrollVal = pageNodes.item(index).get("offsetTop");
        } else {
            scrollAxis = SCROLL_X;
            scrollVal = pageNodes.item(index).get("offsetLeft");
        }
        
        host.set(scrollAxis, scrollVal, {
            duration: duration,
            easing: easing
        });
    }