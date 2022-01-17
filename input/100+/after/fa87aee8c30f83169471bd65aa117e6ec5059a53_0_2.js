function switchToNextPath(callback) {
        var currentPathID,
            nextIndex,
            nextPathID;

        if (activePathIndex > -1) {
            console.log("activePathIndex = " + activePathIndex);
            currentPathID = getPathIdByIndex(activePathIndex);
            nextIndex = getNextPathIndex();
            nextPathID = getPathIdByIndex(nextIndex);

            if (currentPathID != nextPathID) {
                $("#" + currentPathID).fadeOut("slow", function () {
                    $("#" + nextPathID).fadeIn("slow", callback);
                    jsPlumb.repaintEverything();
                });

                activePathIndex = nextIndex;
            } else {
                if ($.isFunction(callback)) {
                    callback();
                }
            }
        }
    }