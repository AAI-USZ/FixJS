function (operation, baseUrl, recordType, csid, fileExtension, vocab) {
        if (operation === "addRelations") {
            return cspace.util.addTrailingSlash(baseUrl) + "relationships/";
        } else if (operation === "removeRelations") {
            return cspace.util.addTrailingSlash(baseUrl) + "relationships/0";
        } else {
            return cspace.util.addTrailingSlash(baseUrl) + (vocab || recordType) + "/" + (csid ? csid + fileExtension : "");
        }
    }