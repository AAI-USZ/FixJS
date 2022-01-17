function (that) {
        var tree = {
            searchButton: {
                messagekey: "searchBox-searchButtonText"
            },
            searchQuery: "${keywords}",
            expander: [{
                type: "fluid.renderer.condition",
                condition: "${messagekeys.recordTypeSelectLabel}",
                trueTree: {
                    recordTypeSelectLabel: {
                        messagekey: "${messagekeys.recordTypeSelectLabel}"
                    }
                }
            }, {
                type: "fluid.renderer.condition",
                condition: "${vocabs}",
                trueTree: {
                    selectVocab: {
                        decorators: {
                            type: "jQuery",
                            func: "hide"
                        },
                        selection: "${vocabSelection}",
                        optionlist: "${vocabs}",
                        optionnames: "${vocabNames}"
                    },
                    expander: {
                        type: "fluid.renderer.condition",
                        condition: "${messagekeys.selectVocabLabel}",
                        trueTree: {
                            selectVocabLabel: {
                                messagekey: "${messagekeys.selectVocabLabel}",
                                decorators: {
                                    type: "jQuery",
                                    func: "hide"
                                }
                            }
                        }
                    }
                }
            }]
        };
        
        fluid.merge(null, tree, that.subTree);
        
        fluid.each(tree, function (child, key) {
            var decorator = {
                type: "addClass",
                classes: that.options.styles[key]
            };
            child.decorators = child.decorators ? child.decorators.concat([decorator]) : [decorator];
        });

        if (!that.options.enableAdvancedSearch) {
            return tree;
        }
        tree.advancedSearch = {
            decorators: {"addClass": "{styles}.advancedSearch"},
            target: that.options.urls.advancedSearchURL,
            linktext: {
                messagekey: "searchBox-advancedSearchText"
            }
        };
        return tree;
    }