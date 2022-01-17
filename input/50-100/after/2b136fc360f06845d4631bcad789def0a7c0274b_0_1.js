function _addFileToIndexes(entry) {

        // skip invisible files
        if (!ProjectManager.shouldShow(entry)) {
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