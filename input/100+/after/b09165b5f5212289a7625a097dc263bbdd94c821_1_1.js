function _convertEntriesToJSON(entries) {
        var jsonEntryList = [],
            entry,
            entryI;

        for (entryI = 0; entryI < entries.length; entryI++) {
            entry = entries[entryI];
            
            if (shouldShow(entry)) {
                var jsonEntry = {
                    data: entry.name,
                    attr: { id: "node" + _projectInitialLoad.id++ },
                    metadata: { entry: entry }
                };
                if (entry.isDirectory) {
                    jsonEntry.children = [];
                    jsonEntry.state = "closed";
                }
    
                // For more info on jsTree's JSON format see: http://www.jstree.com/documentation/json_data
                jsonEntryList.push(jsonEntry);
    
                // Map path to ID to initialize loaded and opened states
                _projectInitialLoad.fullPathToIdMap[entry.fullPath] = jsonEntry.attr.id;
            }
        }
        return jsonEntryList;
    }