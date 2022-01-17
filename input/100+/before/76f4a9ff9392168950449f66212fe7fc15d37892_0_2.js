function verifyStatementArgs(statement, reason, category) {
    if (userProofDone) {
        return false;
    }
    var toReturn = false;
    // verifying triangle congruence is a bit tricky: it will return true if the given triangles
    // are in an equality OR permuting both triangles with the same permutation results in an equality
    if (category === "triangle congruence") {
        var triangleStrings = statement.split("=");
        var triangle1Permutation = 0;
        var triangle2Permutation = 0;

        var triangle1 = _.find(TRIANGLES, function(triang) {
            var perms = generateTrianglePermutations(triang);
            for (var i = 0; i < perms.length; i++) {
                if (perms[i].segs[0].equals(new Seg(triangleStrings[0][0], triangleStrings[0][1]))
                    && perms[i].segs[1].equals(new Seg(triangleStrings[0][1], triangleStrings[0][2]))
                    && perms[i].segs[2].equals(new Seg(triangleStrings[0][2], triangleStrings[0][0]))) {
                    triangle1Permutation = i;
                    return true;
                }
            }
            return false;
        });

        var triangle2 = _.find(TRIANGLES, function(triang) {
            var perms = generateTrianglePermutations(triang);
            for (var i = 0; i < perms.length; i++) {
                if (perms[i].segs[0].equals(new Seg(triangleStrings[1][0], triangleStrings[1][1]))
                    && perms[i].segs[1].equals(new Seg(triangleStrings[1][1], triangleStrings[1][2]))
                    && perms[i].segs[2].equals(new Seg(triangleStrings[1][2], triangleStrings[1][0]))) {
                    triangle2Permutation = i;
                    return true;
                }
            }
            return false;
        });

        if (triangle1 == null || triangle2 == null) {
            return "those triangles aren't in this figure...";
        }
        else if (triangle1Permutation != triangle2Permutation) {
            return false;
        }
        else {
            toReturn = checkTriangleCongruent(triangle1, triangle2, reason);
        }
    }

    else if (category === "angle equality") {
        var angleStrings = statement.split("=");

        // look for these angles in the list of known angles
        var ang1 = _.find(ANGLES, function(ang) {
            return ang.equals(new Ang(angleStrings[0][0], angleStrings[0][1], angleStrings[0][2]));
        });

        var ang2 = _.find(ANGLES, function(ang) {
            return ang.equals(new Ang(angleStrings[1][0], angleStrings[1][1], angleStrings[1][2]));
        });

        if (ang1 == null || ang2 == null) {
            return "those angles aren't in this figure...";
        }

        else {
            toReturn = checkAngEqual(ang1, ang2, reason);
        }
    }

    else if (category === "segment equality") {
        var segmentStrings = statement.split("=");

        // look for these segments in the list of known segments
        var seg1 = _.find(SEGMENTS, function(seg) {
            return (seg.end1 === segmentStrings[0][0] && seg.end2 === segmentStrings[0][1])
                || (seg.end1 === segmentStrings[0][1] && seg.end2 === segmentStrings[0][0]);
        });

        var seg2 = _.find(SEGMENTS, function(seg) {
            return (seg.end1 === segmentStrings[1][0] && seg.end2 === segmentStrings[1][1])
                || (seg.end1 === segmentStrings[1][1] && seg.end2 === segmentStrings[1][0]);
        });

        if (seg1 == null || seg2 == null) {
            return "those segments aren't in this figure";
        }

        else {
            toReturn = checkSegEqual(seg1, seg2, reason);
        }
    }

    else {
        return "you haven't selected a reason this statement is true";
    }

    // check if the proof is done
    if (eqIn(finalRelation, knownEqualities)) {
        userProofDone = true;
    }

    return toReturn;

}