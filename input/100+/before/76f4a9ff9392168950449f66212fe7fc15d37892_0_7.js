function getFillBlanksHint(giveAway) {
    var unsortedKeyList = _.map(finishedEqualitiesList, function(key) { return _.clone(key); });
    var finishedKeys = sortEqualityList(unsortedKeyList.reverse(), finishedEqualities);

    if (!giveAway) {
        if ($(".missing").length === 0) {
        }
        else {
            var firstMissing = $(".missing").first();
            // if the next open spots are statements, not justifications
            if (firstMissing.children().length > 0) {
                var inputs = _.filter(firstMissing.children(), function(child) {
                    return $(child).hasClass("missingStatement");
                });
                var components = firstMissing[0].id.split("-");

                //only use equalities before the input
                finishedKeys = finishedKeys.slice(0, (Number(components[1]) + 1));
                var beforeEqualities = {};
                for (var i = 0; i < finishedKeys.length; i++) {
                    beforeEqualities[finishedKeys[i]] = finishedEqualities[finishedKeys[i]];
                }

                if (components[0] === "t") {
                    var triangle1 = finishedKeys[components[1]][0];
                    var triangle2 = finishedKeys[components[1]][1];

                    var useToProve = checkTriangleForHint(triangle1, triangle2, beforeEqualities);
                    if (useToProve.length > 0) {
                        return "You know that " + prettifyEquality(useToProve[0][0] + "," + useToProve[0][1])
                        + ", " + prettifyEquality(useToProve[1][0] + "," + useToProve[1][1])
                        + ", and " + prettifyEquality(useToProve[2][0] + "," + useToProve[2][1]) + ". What can you prove from this?";
                    }
                }
                else if (components[0] === "a") {
                    var angle1 = finishedKeys[components[1]][0];
                    var angle2 = finishedKeys[components[1]][1];

                    var useToProve = checkAngForHint(angle1, angle2, beforeEqualities);
                    if (useToProve.length > 0 && useToProve[0] instanceof Triang) {
                        return "You know that " + prettifyEquality(useToProve[0] + "," + useToProve[1]) + ". What angles can you prove equal from this?";
                    }
                    else if (useToProve.length > 0) {
                        return "Try using " + useToProve + " to prove some useful pair of angles equal.";
                    }
                }
                else {
                    var seg1 = finishedKeys[components[1]][0];
                    var seg2 = finishedKeys[components[1]][1];

                    var useToProve = checkSegForHint(seg1, seg2, beforeEqualities);
                    if (useToProve.length > 0) {
                        return "You know that " + prettifyEquality(useToProve[0] + "," + useToProve[1]) + ". What segments can you prove equal from this?";
                    }
                }
            }
        }
    }
    else {
        if ($(".missing").length === 0) {
        }
        else {
            var firstMissing = $(".missing").first();
            // if the next open spots are statements, not justifications
            if (firstMissing.children().length > 0) {
                var inputs = _.filter(firstMissing.children(), function(child) {
                    return $(child).hasClass("missingStatement");
                });
                var components = firstMissing[0].id.split("-");
                firstMissing.removeClass("missing");
                return prettifyEquality([finishedKeys[components[1]][0], finishedKeys[components[1]][1]]);
            }
            else {

            }
        }
    }
}