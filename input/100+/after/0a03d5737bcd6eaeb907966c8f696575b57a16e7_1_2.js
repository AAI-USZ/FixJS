function (that) {
        var tree = {},
            model = that.model;
        if (model.authorities.length > 0) {
            tree.addToPanel = {};
            tree.addTermTo = {
                messagekey: "autocomplete-addTermTo",
                args: ["${term}"]
            };
            cspace.autocomplete.makeAuthoritySelectionTree(tree, "authorityItem", "authorities", "fullName");
        }
        if (model.matches.length < 1) {
            tree.noMatches = {
                messagekey: "autocomplete-noMatches"
            };
        }
        else {
            tree.matches = {};
            cspace.autocomplete.makePNPSelectionTree(that.options.elPaths, that.options.styles, tree, "matchItem");
        }
        return tree;
    }