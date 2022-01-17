function() {
        var sv = this,

        // Ideally using CSSMatrix - don't think we have it normalized yet though.
        // origX = (new WebKitCSSMatrix(cb.getComputedStyle("transform"))).e;
        // origY = (new WebKitCSSMatrix(cb.getComputedStyle("transform"))).f;

            origX = sv.get(SCROLL_X),
            origY = sv.get(SCROLL_Y),

            cb = sv._cb,
            bb = sv._bb,

            HWTransform,
            dims,

            TRANS = ScrollView._TRANSITION;

        // TODO: Is this OK? Just in case it's called 'during' a transition.
        if (NATIVE_TRANSITIONS) {
            cb.setStyle(TRANS.DURATION, ZERO);
            cb.setStyle(TRANS.PROPERTY, EMPTY);
        }

        HWTransform = sv._forceHWTransforms;
        sv._forceHWTransforms = false;  // the z translation was causing issues with picking up accurate scrollWidths in Chrome/Mac.

        sv._moveTo(cb, 0, 0);
        // dims = [bb.get("offsetWidth"), bb.get("offsetHeight"), bb.get('scrollWidth'), bb.get('scrollHeight')];
        dims = {
            'offsetWidth' : bb.get("offsetWidth"),
            'offsetHeight': bb.get("offsetHeight"),
            'scrollWidth' : bb.get('scrollWidth'),
            'scrollHeight': bb.get('scrollHeight')
        };

        sv._moveTo(cb, -1*origX, -1*origY);

        sv._forceHWTransforms = HWTransform;

        return dims;
    }