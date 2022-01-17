function checkAngEqual(ang1, ang2, reason) {
    // if this is already known
    if (eqIn([ang1, ang2], knownEqualities)) {
        return true;
    }

    // if the angles' corresponding triangles are congruent AND they're the same part of those triangles, we add
    // to the known equalities
    for (var i = 0; i < ang1.triangles.length; i++) {
        for (var j = 0; j < ang2.triangles.length; j++) {
            if (checkTriangleCongruent(ang1.triangles[i][0], ang2.triangles[j][0])
                && _.indexOf(ang1.triangles[i][0].angs, ang1) === _.indexOf(ang2.triangles[j][0].angs, ang2)) {

                if (reason === "CPCTC" || reason === "corresponding parts of congruent triangles are congruent") {
                    knownEqualities[[ang1, ang2]] = "corresponding parts of congruent triangles are congruent";
                    knownEqualities[[ang2, ang1]] = "corresponding parts of congruent triangles are congruent";
                    return true;
                }
            }
        }
    }


    //if the angles share a midpoint, and their endpoints are part of two segments, then the angles are vertical
    if (ang1.mid === ang2.mid) {
        var sharedLines = 0;
        for (var i = 0; i < SEGMENTS.length; i++) {
            if (SEGMENTS[i].equals(new Seg(ang1.end1, ang2.end1)) ||
                SEGMENTS[i].equals(new Seg(ang1.end1, ang2.end2)) ||
                SEGMENTS[i].equals(new Seg(ang1.end2, ang2.end1)) ||
                SEGMENTS[i].equals(new Seg(ang1.end2, ang2.end2))) {
                if (!isRelationPossible([SEGMENTS[i], new Seg(SEGMENTS[i].end1, ang1.mid)])) {
                    sharedLines += 1;
                }

            }
        }

        if (sharedLines === 4) {
            if (reason === "vertical angles" || reason === "vertical angles are equal") {
                knownEqualities[[ang1, ang2]] = "vertical angles are equal";
                knownEqualities[[ang2, ang1]] = "vertical angles are equal";
                return true;
            }
        }
    }

    if (eqIn([ang1, ang2], altInteriorAngs) || eqIn([ang2, ang1], altInteriorAngs)) {

        if (reason === "alternate angles" || reason === "alternate interior angles are equal") {
            knownEqualities[[ang1, ang2]] = "alternate interior angles are equal";
            knownEqualities[[ang2, ang1]] = "alternate interior angles are equal";
            return true;
        }
    }


    return false;

}