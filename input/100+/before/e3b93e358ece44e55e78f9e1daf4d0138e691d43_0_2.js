function setToSyncing(connectorName){
        var row = $("#connector-" + connectorName);
        if (row.hasClass("nowSynchro"))
            return;
        row.addClass("nowSynchro");
        var syncLED = $("#syncLED-" + connectorName);
        syncLED.removeClass("syncLED-yes");
        syncLED.removeClass("syncLED-no");
        syncLED.addClass("syncLED-waiting");
        syncLED.html("<span class=\"syncLED-waiting\">" +
                     "<img src=\"/css/devicesPictures/load.gif\" alt=\"load\">" +
                     "</span>");
        var lastSync = $("#lastSync-" + connectorName);
        lastSync.html("Now synchronizing");
        var syncNowBtn = $("#syncNow-" + connectorName);
        var disabledBtn = $("<span>" + syncNowBtn.html() + "</span>");
        syncNowBtn.replaceWith(disabledBtn);
    }