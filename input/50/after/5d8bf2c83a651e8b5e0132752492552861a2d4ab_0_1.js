function setJsonData(json) {
        reset();

        jsonData = $.fromJsonRef(json);

        if (!jsonData.hasOwnProperty("paths")) {
            pathCount = 0;
        } else {
            pathCount = jsonData.paths.length;
        }
    }