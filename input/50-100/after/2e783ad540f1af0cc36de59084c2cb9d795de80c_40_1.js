function (reg_UUID, scr_UUID, encountertype) {
        return (HOST + '/ws/rest/v1/raxacore/patientlist' + '?inList=' + reg_UUID + '&notInList=' + scr_UUID + '&encounterType=' + encountertype);
    }