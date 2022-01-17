function(textLength, recordCount, loadTime) {
            this.tagEvent('Search', {
                            textLength: (textLength < 3) ? '< 3' : (textLength < 5) ? '3 - 5' : '> 5',
                            resultsetSize: bucketRecordCount(recordCount),
                            loadTimeRange: bucketLoadTime(loadTime),
                            loadTime: loadTime
                          });
        }