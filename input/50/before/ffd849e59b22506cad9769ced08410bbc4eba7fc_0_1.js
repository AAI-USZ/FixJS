function(event) {
                if (!event) return;

                if (_hasIE8EventSystem()) {
                    event.returnValue = false;
                    event.cancelBubble = true;
                } else {
                    event.preventDefault();
                    event.stopPropagation();
                }
            }