function testNonImmediateUpdates() {
    document.body.innerHTML="<h6>Update Check Callback</h6><div id=\"updateCallback\">No update</div>";
    checks = 0;
    interval = setInterval(function() {
        checks++;
        if(OpenMEAP_update!='undefined') {
            clearInterval(interval);
            if(OpenMEAP_update!=null) {
                OpenMEAP.updates.onUpdate(OpenMEAP_update);
            } else {
                window.document.getElementById('updateCallback').innerHTML = "No update after "+checks+" check(s)";
            }
        }
    },250);
}