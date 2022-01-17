function simulateTouchEvent(target, type,
    bubbles,            // boolean
    cancelable,         // boolean
    view,               // DOMWindow
    detail,             // long
    screenX, screenY,   // long
    clientX, clientY,   // long
    ctrlKey, altKey, shiftKey, metaKey, // boolean
    touches,            // TouchList
    targetTouches,      // TouchList
    changedTouches,     // TouchList
    scale,              // float
    rotation            // float
) {

    var customEvent;

    // check taget    
    if (!target){
        Y.error("simulateTouchEvent(): Invalid target.");
    }

    //check event type
    if (Y.Lang.isString(type)) {
        type = type.toLowerCase();

        //make sure it's a supported touch event
        if (!touchEvents[type]){
            Y.error("simulateTouchEvent(): Event type '" + type + "' not supported.");
        }
    } else {
        Y.error("simulateTouchEvent(): Event type must be a string.");
    }

    // note that the caller is responsible to pass appropriate touch objects.
    // check touch objects
    // Android(even 4.0) doesn't define TouchList yet
    /*if(type === 'touchstart' || type === 'touchmove') {
        if(!touches instanceof TouchList) {
            Y.error('simulateTouchEvent(): Invalid touches. It must be a TouchList');
        } else {
            if(touches.length === 0) {
                Y.error('simulateTouchEvent(): No touch object found.');
            }
        }
    } else if(type === 'touchend') {
        if(!changedTouches instanceof TouchList) {
            Y.error('simulateTouchEvent(): Invalid touches. It must be a TouchList');
        } else {
            if(changedTouches.length === 0) {
                Y.error('simulateTouchEvent(): No touch object found.');
            }
        }
    }*/

    if(type === 'touchstart' || type === 'touchmove') {
        if(touches.length === 0) {
            Y.error('simulateTouchEvent(): No touch object in touches');
        }
    } else if(type === 'touchend') {
        if(changedTouches.length === 0) {
            Y.error('simulateTouchEvent(): No touch object in changedTouches');
        }
    }

    // setup default values
    if (!Y.Lang.isBoolean(bubbles)) { bubbles = true; } // bubble by default.
    if (!Y.Lang.isBoolean(cancelable)) { 
        cancelable = (type != "touchcancel"); // touchcancel is not cancelled 
    } 
    if (!Y.Lang.isObject(view))     { view = Y.config.win; }
    if (!Y.Lang.isNumber(detail))   { detail = 1; } // usually not used. defaulted to # of touch objects.
    if (!Y.Lang.isNumber(screenX))  { screenX = 0; }
    if (!Y.Lang.isNumber(screenY))  { screenY = 0; }
    if (!Y.Lang.isNumber(clientX))  { clientX = 0; }
    if (!Y.Lang.isNumber(clientY))  { clientY = 0; }
    if (!Y.Lang.isBoolean(ctrlKey)) { ctrlKey = false; }
    if (!Y.Lang.isBoolean(altKey))  { altKey = false; }
    if (!Y.Lang.isBoolean(shiftKey)){ shiftKey = false; }
    if (!Y.Lang.isBoolean(metaKey)) { metaKey = false; }
    if (!Y.Lang.isNumber(scale))    { scale = 1.0; }
    if (!Y.Lang.isNumber(rotation)) { rotation = 0.0; }


    //check for DOM-compliant browsers first
    if (Y.Lang.isFunction(doc.createEvent)) {
        if (Y.UA.android) {
            /**
                * Couldn't find android start version that supports touch event. 
                * Assumed supported(btw APIs broken till icecream sandwitch) 
                * from the beginning.
                */
            if(Y.UA.android < 4.0) {
                /**
                    * Touch APIs are broken in androids older than 4.0. We will use 
                    * simulated touch apis for these versions. 
                    * App developer still can listen for touch events. This events
                    * will be dispatched with touch event types.
                    * 
                    * (Note) Used target for the relatedTarget. Need to verify if
                    * it has a side effect.
                    */
                customEvent = doc.createEvent("MouseEvents");
                customEvent.initMouseEvent(type, bubbles, cancelable, view, detail, 
                    screenX, screenY, clientX, clientY,
                    ctrlKey, altKey, shiftKey, metaKey,
                    0, target);

                customEvent.touches = touches;
                customEvent.targetTouches = targetTouches;
                customEvent.changedTouches = changedTouches;
            } else {
                customEvent = doc.createEvent("TouchEvent");

                // Andoroid isn't compliant W3C initTouchEvent method signature.
                customEvent.initTouchEvent(touches, targetTouches, changedTouches,
                    type, view,
                    screenX, screenY, clientX, clientY,
                    ctrlKey, altKey, shiftKey, metaKey);
            }
        } else if (Y.UA.ios) {
            if(Y.UA.ios >= 2.0) {
                customEvent = doc.createEvent("TouchEvent");

                // Available iOS 2.0 and later
                customEvent.initTouchEvent(type, bubbles, cancelable, view, detail,
                    screenX, screenY, clientX, clientY,
                    ctrlKey, altKey, shiftKey, metaKey,
                    touches, targetTouches, changedTouches,
                    scale, rotation);
            } else {
                Y.error('simulateTouchEvent(): No touch event simulation framework present for iOS, '+Y.UA.ios+'.');
            }
        } else {
            Y.error('simulateTouchEvent(): Not supported agent yet, '+Y.UA.userAgent);
        }

        //fire the event
        target.dispatchEvent(customEvent);
    //} else if (Y.Lang.isObject(doc.createEventObject)){ // Windows Mobile/IE, support later 
    } else {
        Y.error('simulateTouchEvent(): No event simulation framework present.');
    }
}