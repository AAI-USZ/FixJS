function (that) {
        var tree = {
            searchButton: {
                messagekey: "searchBox-searchButtonText"
            },
            searchQuery: {},
            recordTypeSelectLabel: {
                messagekey: "${messagekeys.recordTypeSelectLabel}"
            }
        };
        
        fluid.merge(null, tree, that.recordTypeSelector.produceComponent());
        
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