function(detailView, loadTime) {
            this.tagEvent('Render Detail', {
                            view: detailView,
                            loadTimeRange: bucketLoadTime(loadTime),
                            loadTime: loadTime
                          });
        }