function(listName, recordCount, loadTime) {
            this.tagEvent('Render List', {
                            list: listName,
                            resultsetSize: bucketRecordCount(recordCount),
                            loadTimeRange: bucketLoadTime(loadTime),
                            loadTime: loadTime
                          });
        }