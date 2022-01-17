function(ev) {
                if ($.browser.ie) {
                    var trigger = $trigger[0];
                    trigger.onbeforedeactivate = function() {
                        window.event.returnValue = false;
                        trigger.onbeforedeactivate = null;
                    };
                }
                ev.preventDefault();
            }