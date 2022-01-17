function() {
        checks++;
        if(OpenMEAP_update!='undefined') {
            clearInterval(interval);
            if(OpenMEAP_update!=null) {
                OpenMEAP.updates.onUpdate(OpenMEAP_update);
            } else {
                window.document.getElementById('updateCallback').innerHTML = "No update after "+checks+" check(s)";
            }
        }
    }