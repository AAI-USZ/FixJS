function (config) {
        var paginator = this,
            host = paginator.get(HOST),
            bb = host.get(BOUNDING_BOX),
            cb = host.get(CONTENT_BOX),
            hostFlick = host.get(FLICK),
            optimizeMemory = config.optimizeMemory || paginator.optimizeMemory,
            padding = config.padding || paginator.padding;

        paginator.set(AXIS, config.axis);

        // Don't allow flicks on the paginated axis
        if (config.axis === DIM_X) {
            hostFlick.axis = DIM_Y;
            // host.set(FLICK, hostFlick);
        }
        else if (config.axis === DIM_Y) {
            hostFlick.axis = DIM_X;
            // host.set(FLICK, hostFlick);
        }

        paginator._bb = bb;
        paginator._cb = cb;
        paginator._host = host;

        paginator.padding = padding;
        paginator.optimizeMemory = optimizeMemory;

host.on('scrollEnd', function(){console.log('scrollEnded');})

        // Event listeners        
        paginator.after('indexChange', paginator._afterIndexChange);

        // Method listeners
        paginator.beforeHostMethod('scrollTo', paginator._onScrollTo);
        paginator.beforeHostMethod('_mousewheel', paginator._mousewheel);
        
        paginator.afterHostMethod('_onGestureMoveStart', paginator._gestureMoveStart);
        paginator.afterHostMethod('_onGestureMoveEnd', paginator._gestureMoveEnd);
        paginator.afterHostMethod('_uiDimensionsChange', paginator._afterHostUIDimensionsChange);
        
        paginator.afterHostEvent('render', paginator._afterHostRender);
        paginator.afterHostEvent('scrollEnd', paginator._scrollEnded);
    }