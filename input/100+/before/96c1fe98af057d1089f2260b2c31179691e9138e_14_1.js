function getModeFromFileExtension(fileUrl) {
        var ext = PathUtils.filenameExtension(fileUrl);
        //incase the arg is just the ext
        if (!ext) {
            ext = fileUrl;
        }
        if (ext.charAt(0) === '.') {
            ext = ext.substr(1);
        }

        switch (ext) {

        case "js":
            return "javascript";

        case "json":
            return {name: "javascript", json: true};

        case "css":
            return "css";

        case "less":
            return "less";

        case "html":
        case "htm":
        case "xhtml":
            return "htmlmixed";

        default:
            console.log("Called EditorUtils.js _getModeFromFileExtensions with an unhandled file extension: " + ext);
            return "";
        }
    }