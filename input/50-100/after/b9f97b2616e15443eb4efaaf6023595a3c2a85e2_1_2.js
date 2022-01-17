function testNonImmediateUpdates() {
    document.body.innerHTML="<h6>Update Check Callback</h6><div id=\"update-callback\">No update</div>";
    checks = 0;
    interval = setInterval(function() {
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
    },250);
}