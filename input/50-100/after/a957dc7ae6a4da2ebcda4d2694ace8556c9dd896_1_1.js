function(ev) {
                if ($.browser.msie && parseInt($.browser.version) < 9) {
                    var trigger = $trigger[0];
                    trigger.onbeforedeactivate = function() {
                        window.event.returnValue = false;
                        trigger.onbeforedeactivate = null;
                    };
                }
                ev.preventDefault();
            }