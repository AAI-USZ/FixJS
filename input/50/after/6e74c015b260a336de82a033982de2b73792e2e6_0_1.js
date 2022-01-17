function(scriptUrl) {
    if (window.console)
        console.log("Loading " + scriptUrl + "...");
    document.write("<scr" + "ipt type='text/javascript' src='" + scriptUrl + "'></sc" + "ript>");
}