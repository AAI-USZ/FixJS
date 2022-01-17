function simulateKeyEvent(target /*:HTMLElement*/, type /*:String*/,
                             bubbles /*:Boolean*/,  cancelable /*:Boolean*/,
                             view /*:Window*/,
                             ctrlKey /*:Boolean*/,    altKey /*:Boolean*/,
                             shiftKey /*:Boolean*/,   metaKey /*:Boolean*/,
                             keyCode /*:int*/,        charCode /*:int*/) /*:Void*/
{
    //check target
    if (!target){
        Y.error("simulateKeyEvent(): Invalid target.");
    }

    //check event type
    if (isString(type)){
        type = type.toLowerCase();
        switch(type){
            case "textevent": //DOM Level 3
                type = "keypress";
                break;
            case "keyup":
            case "keydown":
            case "keypress":
                break;
            default:
                Y.error("simulateKeyEvent(): Event type '" + type + "' not supported.");
        }
    } else {
        Y.error("simulateKeyEvent(): Event type must be a string.");
    }

    //setup default values
    if (!isBoolean(bubbles)){
        bubbles = true; //all key events bubble
    }
    if (!isBoolean(cancelable)){
        cancelable = true; //all key events can be cancelled
    }
    if (!isObject(view)){
        view = Y.config.win; //view is typically window
    }
    if (!isBoolean(ctrlKey)){
        ctrlKey = false;
    }
    if (!isBoolean(altKey)){
        altKey = false;
    }
    if (!isBoolean(shiftKey)){
        shiftKey = false;
    }
    if (!isBoolean(metaKey)){
        metaKey = false;
    }
    if (!isNumber(keyCode)){
        keyCode = 0;
    }
    if (!isNumber(charCode)){
        charCode = 0;
    }

    //try to create a mouse event
    var customEvent /*:MouseEvent*/ = null;

    //check for DOM-compliant browsers first
    if (isFunction(doc.createEvent)){

        try {

            //try to create key event
            customEvent = doc.createEvent("KeyEvents");

            /*
             * Interesting problem: Firefox implemented a non-standard
             * version of initKeyEvent() based on DOM Level 2 specs.
             * Key event was removed from DOM Level 2 and re-introduced
             * in DOM Level 3 with a different interface. Firefox is the
             * only browser with any implementation of Key Events, so for
             * now, assume it's Firefox if the above line doesn't error.
             */
            // @TODO: Decipher between Firefox's implementation and a correct one.
            customEvent.initKeyEvent(type, bubbles, cancelable, view, ctrlKey,
                altKey, shiftKey, metaKey, keyCode, charCode);

        } catch (ex /*:Error*/){

            /*
             * If it got here, that means key events aren't officially supported.
             * Safari/WebKit is a real problem now. WebKit 522 won't let you
             * set keyCode, charCode, or other properties if you use a
             * UIEvent, so we first must try to create a generic event. The
             * fun part is that this will throw an error on Safari 2.x. The
             * end result is that we need another try...catch statement just to
             * deal with this mess.
             */
            try {

                //try to create generic event - will fail in Safari 2.x
                customEvent = doc.createEvent("Events");

            } catch (uierror /*:Error*/){

                //the above failed, so create a UIEvent for Safari 2.x
                customEvent = doc.createEvent("UIEvents");

            } finally {

                customEvent.initEvent(type, bubbles, cancelable);

                //initialize
                customEvent.view = view;
                customEvent.altKey = altKey;
                customEvent.ctrlKey = ctrlKey;
                customEvent.shiftKey = shiftKey;
                customEvent.metaKey = metaKey;
                customEvent.keyCode = keyCode;
                customEvent.charCode = charCode;

            }

        }

        //fire the event
        target.dispatchEvent(customEvent);

    } else if (isObject(doc.createEventObject)){ //IE

        //create an IE event object
        customEvent = doc.createEventObject();

        //assign available properties
        customEvent.bubbles = bubbles;
        customEvent.cancelable = cancelable;
        customEvent.view = view;
        customEvent.ctrlKey = ctrlKey;
        customEvent.altKey = altKey;
        customEvent.shiftKey = shiftKey;
        customEvent.metaKey = metaKey;

        /*
         * IE doesn't support charCode explicitly. CharCode should
         * take precedence over any keyCode value for accurate
         * representation.
         */
        customEvent.keyCode = (charCode > 0) ? charCode : keyCode;

        //fire the event
        target.fireEvent("on" + type, customEvent);

    } else {
        Y.error("simulateKeyEvent(): No event simulation framework present.");
    }
}