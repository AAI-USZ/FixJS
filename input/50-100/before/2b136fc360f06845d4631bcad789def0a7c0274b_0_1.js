function _addFileToIndexes(entry) {

        // skip invisible files on mac
        if (brackets.platform === "mac" && entry.name.charAt(0) === ".") {
            return;
        }

        var fileInfo = new FileInfo(entry);
        //console.log(entry.name);
  
        $.each(_indexList, function (indexName, index) {
            if (index.filterFunction(entry)) {
                index.fileInfos.push(fileInfo);
            }
        });
    }