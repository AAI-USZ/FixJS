function (searchBox, that) {
        that.messageBar.hide();
        that.applier.requestChange("results", []);
        that.updateModel({
            keywords: searchBox.locate("searchQuery").val(),
            recordType: searchBox.locate("recordTypeSelect").val(),
            sortKey: ""
        });
        that.resultsPager.applier.requestChange("pageCount", 1);
        that.resultsPager.applier.requestChange("pageIndex", 0);
        that.resultsPager.applier.requestChange("totalRange", 0);
        that.resultsPager.applier.requestChange("sortKey", "");
        that.search();
    }