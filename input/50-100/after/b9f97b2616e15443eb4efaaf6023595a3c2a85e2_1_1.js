function() {
        checks++;
        if(OpenMEAP_update!='undefined') {
            clearInterval(interval);
            if(OpenMEAP_update!=null) {
                OpenMEAP.updates.originalOnUpdate(OpenMEAP_update);
            } else {
                document.getElementById('update-callback').innerHTML = "Update check returned no update.";
            }
        } else {
            document.getElementById('update-callback').innerHTML = "No update after "+checks+" check(s)";
        }
    }