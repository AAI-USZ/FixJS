function () {

        /**
         * Number of level up to look delegated element. -1 will go to the top.
         * @type Number
         */
        this.depth = -1;

        /**
         * Delegated events on body.
         * @type Array
         */
        this.delegatedOnBody = ["click", "focus", "blur", "focusin", "focusout", "mousedown", "mouseup", "mousemove",
                "mouseover", "mouseout", "contextmenu", "touchstart", "touchend", "touchmove"];

        /**
         * Delegated events on window. On modern browser, if focus is not on an element, event are not catched by the
         * body but the window.
         * @type Array
         */
        this.delegatedOnWindow = ["keydown", "keyup", "keypress"];

        /**
         * Map of delegated events for gestures and their class paths.
         * @type Object
         */
        this.delegatedGestures = {
            "tap" : "aria.touch.Tap",
            "swipe" : "aria.touch.Swipe"
        };

        /**
         * Root element on which event are listened for the delegatedOnWindow. In IE, the listener needs to be added to
         * the body instead
         * @type HTMLElement
         */
        this.rootListener = null;

        /**
         * Events supported with or without delegation. Any other event should be considered as an error.
         * @type Object
         */
        this.supportedEvents = {
            dblclick : true,
            mouseleave : true,
            mouseenter : true,
            copy : true,
            change : true,
            paste : true,
            cut : true,
            submit : true
        };

        // note that the change event does not bubble on all browsers (e.g.: on IE) but is necessary as it is the only
        // event which is raised when clicking on an option in the select in other browsers (Chrome)
        if (!aria.core.Browser.isIE) {
            this.delegatedOnBody.push("change", "paste", "cut");
        }

        /**
         * Internal hash map of delegated events. Based on the delegated array, but used to speed up isDelegated
         * @private
         * @type Object
         */
        this._delegatedMap = {};
        var index, l;
        for (index = 0, l = this.delegatedOnBody.length; index < l; index++) {
            var eventName = this.delegatedOnBody[index];
            this._delegatedMap[eventName] = true;
        }
        for (index = 0, l = this.delegatedOnWindow.length; index < l; index++) {
            var eventName = this.delegatedOnWindow[index];
            this._delegatedMap[eventName] = true;
        }
        for (var key in this.delegatedGestures) {
            if (this.delegatedGestures.hasOwnProperty(key)) {
                this._delegatedMap[key] = true;
            }
        }

        // supported through delegation
        for (var key in this._delegatedMap) {
            if (this._delegatedMap.hasOwnProperty(key)) {
                this.supportedEvents[key] = true;
            }
        }

        /**
         * Name of the expando used for event delegation
         * @type {String}
         */
        this.delegateExpando = "atdelegate";

        /**
         * Map of mapping for event delegation, between an expando and a handler.
         * @private
         * @type Object
         */
        this.__delegateMapping = null;

        /**
         * Unique id manager
         * @private
         * @type aria.utils.IdManager
         */
        this.__idMgr = new aria.utils.IdManager("d");

        /**
         * This cache store the dom hierarchy for a start id. It is clean on each add/remove.
         * @private
         * @type Object
         */
        this.__stackCache = null;

        /**
         * List of id removed while executing callback
         * @protected
         * @type Array
         */
        this._changed = null;

        /**
         * Pointer for focus tracking. Updated on any focus and blur event
         * @type HTMLElement
         */
        this._focusTracking = null;

        aria.utils.AriaWindow.$on({
            "unloadWindow" : this.reset,
            scope : this
        });
    }