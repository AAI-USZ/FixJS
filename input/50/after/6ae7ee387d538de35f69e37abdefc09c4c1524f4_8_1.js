function(ev, cps) {
            if ($('.versions_widget', $rootel).is(":visible")) {
                currentPageShown = cps;
                doInit();
            }
        }