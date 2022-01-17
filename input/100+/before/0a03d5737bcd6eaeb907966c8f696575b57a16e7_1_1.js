function (that) {
        var tree = {};
        var index = fluid.find(that.model.matches, function (match, index) {
            if (cspace.autocomplete.matchTerm(match.label, that.model.term)) {
                return index;
            }
        });
        if (index === undefined && that.model.authorities.length > 0) {
            tree.addToPanel = {};
            tree.addTermTo = {
                messagekey: "autocomplete-addTermTo",
                args: ["${term}"]
            };
            cspace.autocomplete.makeSelectionTree(tree, "authorityItem", "authorities", "fullName");
        }
        if (that.model.matches.length === 0) {
            tree.noMatches = {
                messagekey: "autocomplete-noMatches"
            };
        }
        else {
            tree.matches = {};
            tree.longestMatch = cspace.autocomplete.longest(that.model.matches);
            cspace.autocomplete.makeSelectionTree(tree, "matchItem", "matches", "label");
        }
        return tree;
    }