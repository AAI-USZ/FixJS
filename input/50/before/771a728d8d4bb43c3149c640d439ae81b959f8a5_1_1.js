function () {
                changed = true;

                window.onbeforeunload = function () {
                    if ( changed )
                        return 'Navigating away from this page will discard any changes you have made.';
                }
            }