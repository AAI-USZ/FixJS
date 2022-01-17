function (related) {
            if (related !== that.options.related) {
                return;
            }
            that.relatedRecordsListView.updateModel();
        }