function switchToNextPath() {
        var currentPathID,
            nextIndex,
            nextPathID;

        if (activePathIndex > -1) {
            console.log("here");
            currentPathID = getPathIdByIndex(activePathIndex);
            nextIndex = getNextPathIndex();
            nextPathID = getPathIdByIndex(nextIndex);

            if (currentPathID != nextPathID) {
                $("#" + currentPathID).fadeOut("slow", function () {
                    $("#" + nextPathID).fadeIn("slow");
                    jsPlumb.repaintEverything();
                });

                activePathIndex = nextIndex;
            }
        }
    }