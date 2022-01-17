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
        case "cfm":
        case "cfc":
            return "htmlmixed";

        case "xml":
            return "xml";

        case "php":
        case "php3":
        case "php4":
        case "php5":
        case "phtm":
        case "phtml":
            return "php";

        case "cc":
        case "cp":
        case "cpp":
        case "c++":
        case "cxx":
        case "hh":
        case "hpp":
        case "hxx":
        case "h++":
        case "ii":
            return "text/x-c++src";

        case "c":
        case "h":
        case "i":
            return "text/x-csrc";

        case "cs":
            return "text/x-csharp";

        case "java":
            return "text/x-java";

        case "coffee":
            return "coffeescript";

        case "clj":
            return "clojure";

        case "pl":
            return "perl";

        case "rb":
            return "ruby";

        case "sql":
            return "mysql";

        case "diff":
        case "patch":
            return "diff";

        case "md":
            return "markdown";

        default:
            console.log("Called EditorUtils.js _getModeFromFileExtensions with an unhandled file extension: " + ext);
            return "";
        }
    }