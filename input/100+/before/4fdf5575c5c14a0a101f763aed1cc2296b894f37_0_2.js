function() {
        pushPopUi.init();

        $("#puzzle").bind('pagebeforehide', function() { pushPopUi.pauseTimer(); } );
        $("#puzzle").bind('pageshow', function() { pushPopUi.resumeTimer(); } );
        $("#gameOver").bind('pageshow', function() { pushPopUi.playSound("applause"); } );
        $("#gameOver").bind('pagehide', function() { pushPopUi.resetPuzzle(null); } );
        $("#workarea").bind("click", function() { pushPopUi.hideMenu(); } );
                      
        $("#menuBtn").bind("click", function() { pushPopUi.showMenu(); } );
        $("#newBtn").bind("click", function() { pushPopUi.newPuzzle(); } );
        $("#startOverBtn").bind("click", function() { pushPopUi.startOver(); } );
        $("#settingsBtn").bind("click", function() { $.mobile.changePage("#settings", {transition: "slideup"}); } );
        $("#helpBtn").bind("click", function() { $.mobile.changePage("help.html"); } );
        
        $("#stepDemoBtn").bind("click", function() { pushPopUi.getAHint(); } );
        $("#playDemoBtn").bind("click", function() { pushPopUi.demoRun(); } );
        $("#iGetItBtn").bind("click", function() { clearInterval(pushPopUi.demoPlay); setTimeout(function() { pushPopUi.dismissStartup(true); }, 600); } );
        
        if (pushPopUi.premium) {
            $("#hintBtn").bind("click", function() { pushPopUi.getAHint(); } );
        } else {
            $("#hintBtn").removeClass("ui-btn-up-b").addClass("ui-btn-up-c").data("theme", "c");
            $("#hintBtn").bind("click", function() { pushPopUi.showPremiumDLPage(); } );
        }
        $("audio").trigger('load');
        setSize();
        window.addEventListener("resize", setSize);
    }