function (require, exports, module) {
    'use strict';

    require("thirdparty/path-utils/path-utils.min");
    require("thirdparty/CodeMirror2/mode/xml/xml");
    require("thirdparty/CodeMirror2/mode/javascript/javascript");
    require("thirdparty/CodeMirror2/mode/css/css");
    require("thirdparty/CodeMirror2/mode/less/less");
    require("thirdparty/CodeMirror2/mode/htmlmixed/htmlmixed");
    require("thirdparty/CodeMirror2/mode/clike/clike");
    require("thirdparty/CodeMirror2/mode/php/php");
    require("thirdparty/CodeMirror2/mode/coffeescript/coffeescript");
    require("thirdparty/CodeMirror2/mode/clojure/clojure");
    require("thirdparty/CodeMirror2/mode/perl/perl");
    require("thirdparty/CodeMirror2/mode/ruby/ruby");
    require("thirdparty/CodeMirror2/mode/mysql/mysql");
    require("thirdparty/CodeMirror2/mode/diff/diff");
    require("thirdparty/CodeMirror2/mode/markdown/markdown");

    /**
     * @private
     * Given a file URL, determines the mode to use based
     * off the file's extension.
     * @param {string} fileUrl  A cannonical file URL to extract the extension from
     */
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

    // Define public API
    exports.getModeFromFileExtension = getModeFromFileExtension;
}