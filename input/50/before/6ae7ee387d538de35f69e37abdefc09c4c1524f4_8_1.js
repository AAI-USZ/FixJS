function(ev, cps){
            if ($(versionsContainer, $rootel).is(":visible")) {
                currentPageShown = cps;
                doInit();
            }
        }