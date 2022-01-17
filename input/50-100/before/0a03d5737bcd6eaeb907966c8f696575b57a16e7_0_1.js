function (searchEvent, keywordModel, fieldsModel) {
        var searchModel = {};
        var rules = {
            "recordType": "recordType",
            "keywords": "keywords"
        };
        if (fieldsModel) {
            rules.operation = "operation";
            searchModel.fields = fluid.copy(fieldsModel);
        }
        fluid.merge(null, searchModel, transformSearchModel(keywordModel, rules));
        searchEvent.fire(searchModel)
    }