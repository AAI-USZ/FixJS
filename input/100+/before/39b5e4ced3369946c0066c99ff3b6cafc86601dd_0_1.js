function mouseEvent(type, selector) {
            var elem = this.findOne(selector);
            if (!elem) {
                this.log("mouseEvent(): Couldn't find any element matching '" + selector + "' selector", "error");
                return false;
            }
            var evt = document.createEvent("MouseEvents");
            evt.initMouseEvent(type, true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, elem);
            // dispatchEvent return value is false if at least one of the event
            // handlers which handled this event called preventDefault
            return elem.dispatchEvent(evt);
        }