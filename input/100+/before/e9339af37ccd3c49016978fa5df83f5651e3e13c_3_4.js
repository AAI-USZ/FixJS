function simulateGestureEvent(target, type,
    bubbles,            // boolean
    cancelable,         // boolean
    view,               // DOMWindow
    detail,             // long
    screenX, screenY,   // long
    clientX, clientY,   // long
    ctrlKey, altKey, shiftKey, metaKey, // boolean
    scale,              // float
    rotation            // float
) {
    var customEvent;

    if(!Y.UA.ios || Y.UA.ios<2.0) {
        Y.error("simulateGestureEvent(): Native gesture DOM eventframe is not available in this platform.");
    }

    // check taget    
    if (!target){
        Y.error("simulateGestureEvent(): Invalid target.");
    }

    //check event type
    if (Y.Lang.isString(type)) {
        type = type.toLowerCase();

        //make sure it's a supported touch event
        if (!gestureEvents[type]){
            Y.error("simulateTouchEvent(): Event type '" + type + "' not supported.");
        }
    } else {
        Y.error("simulateGestureEvent(): Event type must be a string.");
    }

    // setup default values
    if (!Y.Lang.isBoolean(bubbles)) { bubbles = true; } // bubble by default
    if (!Y.Lang.isBoolean(cancelable)) { cancelable = true; } 
    if (!Y.Lang.isObject(view))     { view = Y.config.win; }
    if (!Y.Lang.isNumber(detail))   { detail = 2; }     // usually not used.
    if (!Y.Lang.isNumber(screenX))  { screenX = 0; }
    if (!Y.Lang.isNumber(screenY))  { screenY = 0; }
    if (!Y.Lang.isNumber(clientX))  { clientX = 0; }
    if (!Y.Lang.isNumber(clientY))  { clientY = 0; }
    if (!Y.Lang.isBoolean(ctrlKey)) { ctrlKey = false; }
    if (!Y.Lang.isBoolean(altKey))  { altKey = false; }
    if (!Y.Lang.isBoolean(shiftKey)){ shiftKey = false; }
    if (!Y.Lang.isBoolean(metaKey)) { metaKey = false; }

    if (!Y.Lang.isNumber(scale)){ scale = 1.0; }
    if (!Y.Lang.isNumber(rotation)){ rotation = 0.0; }

    customEvent = doc.createEvent("GestureEvent");

    customEvent.initGestureEvent(type, bubbles, cancelable, view, detail,
        screenX, screenY, clientX, clientY,
        ctrlKey, altKey, shiftKey, metaKey,
        target, scale, rotation);

    target.dispatchEvent(customEvent);
}