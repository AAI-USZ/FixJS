function(message,details,aspect){
    if(aspect == undefined){
        aspect = "DEBUG";
    }
    dprint("(**) Logging debug info: " + message);
    startSwarm("log.js","info",aspect, message, details);
}