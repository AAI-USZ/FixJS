function (config) {
        var paginator = this,
            host = paginator.get(HOST),
            bb = host.get(BOUNDING_BOX),
            cb = host.get(CONTENT_BOX),
            optimizeMemory = config.optimizeMemory || paginator.optimizeMemory,
            padding = config.padding || paginator.padding;

        paginator.set(AXIS, config.axis);

        paginator._bb = bb;
        paginator._cb = cb;
        paginator._host = host;

        paginator.padding = padding;
        paginator.optimizeMemory = optimizeMemory;

        paginator.afterHostMethod('_onGestureMoveStart', paginator._onGestureMoveStart);
        paginator.afterHostMethod('_onGestureMoveEnd', paginator._onGestureMoveEnd);
        paginator.beforeHostMethod('scrollTo', paginator._onScrollTo);
        paginator.beforeHostMethod('_mousewheel', paginator._mousewheel);
        paginator.afterHostMethod('_uiDimensionsChange', paginator._afterHostUIDimensionsChange);
        paginator.afterHostEvent('render', paginator._afterHostRender);
        paginator.afterHostEvent('scrollEnd', paginator._scrollEnded);
        paginator.after('indexChange', paginator._afterIndexChange);
    }