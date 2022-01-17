function (options, urls) {
        var url = fluid.stringTemplate(options.vocab && options.vocab !== "all" ? urls.defaultVocabUrl : urls.defaultUrl, {
            recordType: options.recordType,
            keywords: options.keywords,
            vocab: options.vocab || "",
            pageNum: options.pageIndex ? fluid.stringTemplate(urls.pageNum, {pageNum: options.pageIndex}) : "",
            pageSize: options.pageSize ? fluid.stringTemplate(urls.pageSize, {pageSize: options.pageSize}) : "",
            sort: options.sortKey ? fluid.stringTemplate(urls.sort, {sortKey: options.sortKey, sortDir: options.sortDir || "1"}) : ""
        });
        return url;
    }