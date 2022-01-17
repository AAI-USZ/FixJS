function setJsonData(json) {
        reset();

        jsonData = $.fromJsonRef(json);
        pathCount = jsonData.paths.length;
    }