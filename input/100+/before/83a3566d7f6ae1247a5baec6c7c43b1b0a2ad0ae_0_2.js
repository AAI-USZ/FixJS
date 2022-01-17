function() {
    var oldScript;
    // cleanup old script if it exists to prevent memory leak
    while (oldScript = document.getElementById('fetchChannelId')) {
        oldScript.parentNode.removeChild(oldScript);
        for (var prop in oldScript) {
            delete oldScript[prop];
        }
    }

    var script = document.createElement("script");
    script.src =  this.config.serverBaseURL + "/token?callback=Backplane.finishInit&bus=" + this.config.busName + "&rnd=" + Math.random();;
    script.type = "text/javascript";
    script.id = 'fetchChannelId';
    var firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(script, firstScript);

}