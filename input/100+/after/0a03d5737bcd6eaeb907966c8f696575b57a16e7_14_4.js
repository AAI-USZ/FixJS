function (searchBox, that) {
        that.messageBar.hide();
        that.applier.requestChange("results", []);
        that.updateModel({
            keywords: searchBox.model.keywords,
            recordType: searchBox.model.recordType,
            vocab: searchBox.model.vocabs ? searchBox.model.vocabSelection : undefined,
            sortKey: ""
        });
        that.resultsPager.applier.requestChange("pageCount", 1);
        that.resultsPager.applier.requestChange("pageIndex", 0);
        that.resultsPager.applier.requestChange("totalRange", 0);
        that.resultsPager.applier.requestChange("sortKey", "");
        that.search();
    }