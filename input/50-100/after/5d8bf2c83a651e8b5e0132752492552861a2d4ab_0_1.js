function switchToPreviousPath() {
        var currentPathID,
            previousIndex,
            previousPathID;

        if (activePathIndex > -1) {
            currentPathID = getPathIdByIndex(activePathIndex);
            previousIndex = getPreviousPathIndex();
            previousPathID = getPathIdByIndex(previousIndex);

            if (currentPathID != previousPathID) {
                $("#" + currentPathID).fadeOut("slow", function () {
                    $("#" + previousPathID).fadeIn("slow");
                    jsPlumb.repaintEverything();
                });

                activePathIndex = previousIndex;
            }
        }
    }