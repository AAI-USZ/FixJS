function nextStatementHint() {
    var hintKeys = [];
    // filter out all keys with value "same *" or "given," as well as those values already in the proof
    for (var eq in finishedEqualities) {
        if (finishedEqualities[eq].substring(0, 4) != "Same" && finishedEqualities[eq] != "given" && !(eq in knownEqualities)) {
            hintKeys.push(eq);
        }
    }

    for (var i = 0; i < 10; i++) {
        // look for something that can be proven with the statements already known
        // that is in finishedEqualities
        var tryProving = hintKeys[KhanUtil.randRange(0, hintKeys.length - 1)];

        // awful, terrible hacky way to deal with javascript object hashes
        if (tryProving[0] === "t") {
            var triangle1 = _.find(TRIANGLES, function(triang) {
                return triang.toString() === tryProving.substring(0, 11);
            });

            var triangle2 = _.find(TRIANGLES, function(triang) {
                return triang.toString() === tryProving.substring(12, 23);
            });

            var useToProve = checkTriangleForHint(triangle1, triangle2, knownEqualities);
            if (useToProve.length > 0) {
                return ["You know that " + prettifyEquality(useToProve[0][0] + "," + useToProve[0][1])
                + ", " + prettifyEquality(useToProve[1][0] + "," + useToProve[1][1])
                + ", and " + prettifyEquality(useToProve[2][0] + "," + useToProve[2][1]) + ". What can you prove from this?", 
                "A useful thing to prove here is " + prettifyEquality(triangle1 + "," + triangle2)];
            }
        }

        else if (tryProving[0] === "s") {
            var seg1 = _.find(SEGMENTS, function(seg) {
                return seg.toString() === tryProving.substring(0, 5);
            });
            var seg2 = _.find(SEGMENTS, function(seg) {
                return seg.toString() === tryProving.substring(6, 11);
            });

            var useToProve = checkSegForHint(seg1, seg2, knownEqualities);
            if (useToProve.length > 0) {
                return ["You know that " + prettifyEquality(useToProve[0] + "," + useToProve[1]) + ". What segments can you prove equal from this?",
                "A useful thing to prove here is " + prettifyEquality(seg1 + "," + seg2)];
            }
        }

        else if (tryProving[0] === "a") {
            var ang1 = _.find(ANGLES, function(ang) {
                return ang.toString() === tryProving.substring(0, 6);
            });
            var ang2 = _.find(ANGLES, function(ang) {
                return ang.toString() === tryProving.substring(7, 13);
            });


            var useToProve = checkAngForHint(ang1, ang2, knownEqualities);
            if (useToProve.length > 0 && useToProve[0] instanceof Triang) {
                return ["You know that " + prettifyEquality(useToProve[0] + "," + useToProve[1]) + ". What angles can you prove equal from this?",
                "A useful thing to prove here is " + prettifyEquality(ang1 + "," + ang2)];
            }
            else if (useToProve.length > 0) {
                return ["Try using " + useToProve + " to prove some useful pair of angles equal.",
                 "A useful thing to prove here is " + prettifyEquality(ang1 + "," + ang2)];
            }
        }

    }
    return "Sorry, there seems to be a problem with the hint system. Please report this bug.";
}