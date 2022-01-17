function allocateFisherToOcean(parent) {
        var availableOcean = "";
        for (i = 1; i <= oceanGroups[parent].numOceans; i++) {
            oID = parent + "-" + (1000 + i).toString().substr(1);
            if (oceans[oID].actualHumans < oceans[oID].expectedHumans) {
                availableOcean = oID;
                break;
            }
        }
        return availableOcean;
    }