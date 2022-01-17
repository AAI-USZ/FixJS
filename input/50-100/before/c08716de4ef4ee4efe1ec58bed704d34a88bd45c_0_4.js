function(message){
    if(message.type == "start" && message.instanceUID != thisAdaptor.instanceUID){
        console.log("["+thisAdaptor.nodeName+"] Forcing process exit because an node with the same name got alive!");
    process.exit(999);
    }
    if(thisAdaptor.onBroadcastCallback != null){
        thisAdaptor.onBroadcastCallback(message);
    }
}