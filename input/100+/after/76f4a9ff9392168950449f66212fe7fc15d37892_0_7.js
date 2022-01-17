function getFillBlanksHint(giveAway) {
    var unsortedKeyList = _.map(finishedEqualitiesList, function(key) { return _.clone(key); });
    var finishedKeys = sortEqualityList(unsortedKeyList.reverse(), finishedEqualities);

    if (!giveAway) {
        var firstMissing = $(".missing").first();
        // if the next open spot is a statement
        if (!firstMissing.hasClass("missingReason")) {
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

                console.log(angle1 + "," + angle2);

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

                console.log(seg1 + "," + seg2);

                var useToProve = checkSegForHint(seg1, seg2, beforeEqualities);
                if (useToProve.length > 0) {
                    return "You know that " + prettifyEquality(useToProve[0] + "," + useToProve[1]) + ". What segments can you prove equal from this?";
                }
            }
        }
        // if the next open spot is a justification
        else{
            if(firstMissing[0].id[0] === "t"){
                return "You know that triangles are congruent because segments or angles in them are congruent. What segments or angles do you know "
                + "are equal? Which can you use?";
            }
            else{
                return "Is this segment/angle pair part of a pair of congruent triangles? If not, there are only two other reasons they could be equal "
                + "(in this exercise).";
            }
        }
    }
    else {
        if ($(".missing").length === 0) {
        }
        else {
            var firstMissing = $(".missing").first();
            console.log(firstMissing);
            // if the next open spots are statements, not justifications
            if (!firstMissing.hasClass("missingReason")) {
                var components = firstMissing[0].id.split("-");
                firstMissing.removeClass("missing");
                return "The next equality you have to fill in is " + prettifyEquality([finishedKeys[components[1]][0], finishedKeys[components[1]][1]]);
            }
            else {
                firstMissing.removeClass("missing");
                return "The next equality with a missing reason is true by " + finishedEqualities[firstMissing[0].id];
            }
        }
    }
}