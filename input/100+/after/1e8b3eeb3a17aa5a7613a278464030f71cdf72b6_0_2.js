function onFrameSpin(e) {
        var nDelta = 0;
        if (!e) { // For IE, access the global (window) event object
            e = window.event;
        }
        // cross-bowser handling of eventdata to boil-down delta (+1 or -1)
        if ( e.wheelDelta ) { // IE and Opera
            nDelta= e.wheelDelta;
            if ( window.opera ) {  // Opera has the values reversed
                nDelta= -nDelta;
            }
        }
        else if (e.detail) { // Mozilla FireFox
            nDelta= -e.detail;
        }

        if (nDelta < 0) {
            //HandleMouseSpin( 1, e.clientX, e.clientY );
            goPreviousExplicit();
        }
        if (nDelta > 0) {
            //HandleMouseSpin( -1, e.clientX, e.clientY );
            goNextExplicit();
        }

        if ( e.preventDefault ) {  // Mozilla FireFox
            e.preventDefault();
        }
        e.returnValue = false;  // cancel default action
    }