f    'use strict';

    var EditorManager       = brackets.getModule("editor/EditorManager"),
        QuickOpen           = brackets.getModule("search/QuickOpen"),
        JSUtils             = brackets.getModule("language/JSUtils"),
        DocumentManager     = brackets.getModule("document/DocumentManager");


   /** 
    * FileLocation class
    * @constructor
    * @param {string} fullPath
    * @param {number} line
    * @param {number} chFrom column start position
    * @param {number} chTo column end position
    * @param {string} functionName
    */
    function FileLocation(fullPath, line, chFrom, chTo, functionName) {
        this.fullPath = fullPath;
        this.line = line;
        this.chFrom = chFrom;
        this.chTo = chTo;
        this.functionName = functionName;
    }

    /**
     * Contains a list of information about functions for a single document. This array is populated
     * by createFunctionList()
     * @type {?Array.<FileLocation>}
     */
    var functionList = null;


    function done() {
        functionList = null;
    }

    /**
     * Retrieves the FileLocation object stored in the functionsList for a given function name
     * @param {string} functionName
     * @returns {FileLocation}
     */
    function getLocationFromFunctionName(functionName) {
        if (!functionList) {
            return null;
        }

        // TODO: doesn't handle case where two functions have same name
        var i, fileLocation;
        for (i = 0; i < functionList.length; i++) {
            var functionInfo = functionList[i];
            if (functionInfo.functionName === functionName) {
                fileLocation = functionInfo;
                break;
            }
        }

        return fileLocation;
    }

    
    function createFunctionList() {
        var doc = DocumentManager.getCurrentDocument();
        if (!doc) {
            return;
        }

        functionList = [];
        var docText = doc.getText();
        var lines = docText.split("\n");
        var functions = JSUtils.findAllMatchingFunctionsInText(docText, "*");
        functions.forEach(function (funcEntry) {
            var chFrom = lines[funcEntry.lineStart].indexOf(funcEntry.name);
            var chTo = chFrom + funcEntry.name.length;
            functionList.push(new FileLocation(null, funcEntry.lineStart, chFrom, chTo, funcEntry.name));
        });

    }

    

    /**
     * @param {string} query what the user is searching for
     * @returns {Array.<string>} sorted and filtered results that match the query
     */
    function search(query) {
        createFunctionList();

        query = query.slice(query.indexOf("@") + 1, query.length);
        var filteredList = $.map(functionList, function (itemInfo) {

            var functionName = itemInfo.functionName;
            if (functionName.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
                return functionName;
            }
        }).sort(function (a, b) {
            a = a.toLowerCase();
            b = b.toLowerCase();
            if (a > b) {
                return -1;
            } else if (a < b) {
                return 1;
            } else {
                return 0;
            }
        });

        return filteredList;
    }

    /**
     * @param {string} query what the user is searching for
     * @param {boolean} returns true if this plug-in wants to provide results for this query
     */
    function match(query) {
        // only match @ at beginning of query for now
        // TODO: match any location of @ when QuickOpen._handleItemFocus() is modified to
        // dynamic open files
        //if (query.indexOf("@") !== -1) {
        if (query.indexOf("@") === 0) {
            return true;
        }
    }

    /**
     * Select the selected item in the current document
     * @param {HTMLLIElement} selectedItem
     */
    function itemFocus(selectedItem) {
        var fileLocation = getLocationFromFunctionName($(selectedItem).text());

        if (fileLocation) {
            var from = {line: fileLocation.line, ch: fileLocation.chFrom};
            var to = {line: fileLocation.line, ch: fileLocation.chTo};
            EditorManager.getCurrentFullEditor().setSelection(from, to);
        }
    }

    /**
     * TODO: selectedItem is currently a <LI> item from smart auto complete container. It should just be data
     */
    function itemSelect(selectedItem) {
        itemFocus(selectedItem);
    }



    QuickOpen.addQuickOpenPlugin(
        {
            name: "JavaScript functions",
            fileTypes: ["js"],
            done: done,
            search: search,
            match: match,
            itemFocus: itemFocus,
            itemSelect: itemSelect,
            resultsFormatter: null // use default
        }
    );

});