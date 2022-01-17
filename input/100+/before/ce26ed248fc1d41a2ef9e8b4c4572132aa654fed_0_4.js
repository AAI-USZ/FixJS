function traceBack(statementKey, depth) {
    // if this statement is already known, we don't want to trace it back any more
    if (eqIn(statementKey, finishedEqualities)) {
        return;
    }

    // if we have reached the depth we wanted to reach back in this proof, we don't trace it back any more
    if (depth === 0) {
        finishedEqualities[statementKey] = "given";
        finishedEqualities[statementKey.reverse()] = "given";
        finishedEqualitiesList.push(statementKey);
        finishedEqualitiesList.push(statementKey.reverse());

        if (statementKey[0] instanceof Triang) {
            fixedTriangles[statementKey[0]] = true;
            fixedTriangles[statementKey[1]] = true;
        }
    }
    else {
        // for now, we will assume the known quantity is an equality and try to work backwards...
        // if we know two triangles to be congruent
        if (statementKey[0] instanceof Triang) {
            var triangle1 = statementKey[0];
            var triangle2 = statementKey[1];

            // if the triangles share a side, use that fact
            var sharedSeg = _.intersection(triangle1.segs, triangle2.segs);
            var sharedSegIndex = _.indexOf(triangle1.segs, sharedSeg[0]);
            // if the shared segment is segment 1 of triangle 1 and segment 0 of triangle 2, for example,
            // we need to adjust the numbering of those triangles so that they have the same index
            var indexDiff = sharedSegIndex - _.indexOf(triangle2.segs, sharedSeg[0]);


            // if the triangles share vertical angles, use that fact
            // angles are vertical if they share a midpoint, and have two
            // shared lines from their respective endpoints, each of which
            // goes through the shared midpoint
            var verticalAngs = null;
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    var ang1 = triangle1.angs[i];
                    var ang2 = triangle2.angs[j];
                    if (ang1.mid === ang2.mid) {
                        var sharedLines = 0;
                        for (var k = 0; k < SEGMENTS.length; k++) {
                            if (SEGMENTS[k].equals(new Seg(ang1.end1, ang2.end1)) ||
                                SEGMENTS[k].equals(new Seg(ang1.end1, ang2.end2)) ||
                                SEGMENTS[k].equals(new Seg(ang1.end2, ang2.end1)) ||
                                SEGMENTS[k].equals(new Seg(ang1.end2, ang2.end2))) {

                                if (!isRelationPossible([SEGMENTS[k], new Seg(SEGMENTS[k].end1, ang1.mid)])) {
                                    sharedLines += 1;
                                }
                            }
                        }
                        // vertical angles should share two sets of lines, counted twice for reasons of
                        // this being written stupidly
                        if (sharedLines === 4) {
                            verticalAngs = [i, j];
                            break;
                        }
                    }
                }
            }


            // if the triangles have alternate interior angles, use that fact
            var alternateAngs = null;
            // for two angles to be alternate interior, there must be a line from one midpoint to the other
            loop1:
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    var ang1 = triangle1.angs[i];
                    var ang2 = triangle2.angs[j];

                    if (eqIn([ang1, ang2], altInteriorAngs) || eqIn([ang2, ang1], altInteriorAngs)) {
                        alternateAngs = [i, j];
                        break loop1;
                    }
                }
            }


            // if there are vertical angles and alternate interior angles, use one or the other
            if (verticalAngs != null && alternateAngs != null) {
                if (KhanUtil.random() < 0.5) {
                    verticalAngs = null;
                }
                else {
                    alternateAngs = null;
                }
            }

            // if both triangles are fixed, don't use shared side / vertical angles / alternate angles
            // unless they happen to be fixed in the right way
            if (triangIn(triangle1, fixedTriangles) && triangIn(triangle2, fixedTriangles)) {
                if (sharedSeg.length > 0 && indexDiff != 0) {
                    sharedSeg = [];
                }
                if (verticalAngs != null && verticalAngs[0] != verticalAngs[1]) {
                    verticalAngs = null;
                }
                if (alternateAngs != null && alternateAngs[0] != alternateAngs[1]) {
                    alternateAngs = null;
                }
            }


            // pick a triangle congruence theorem
            var congruence = KhanUtil.randRange(1, 4);

            // triangle congruence case 1: shared side
            if (!(sharedSeg.length === 0)) {

                // determine if we can rotate this triangle without screwing up some already
                // established equality
                // one or both triangles must not be in an equality for this relation to be possible

                if (!triangIn(triangle2, fixedTriangles)) {
                    triangle2.segs.rotate(indexDiff);
                    triangle2.angs.rotate(indexDiff);
                }
                else if (!triangIn(triangle1, fixedTriangles)) {
                    triangle1.segs.rotate(-indexDiff);
                    triangle1.angs.rotate(-indexDiff);
                    sharedSegIndex = (sharedSegIndex - indexDiff) % 3;
                }

                //SSS
                if (congruence === 1) {
                    setGivenOrTraceBack([[triangle1.segs[(sharedSegIndex + 1) % 3], triangle2.segs[(sharedSegIndex + 1) % 3]],
                        [triangle1.segs[(sharedSegIndex + 2) % 3], triangle2.segs[(sharedSegIndex + 2) % 3]]], "SSS", statementKey, depth - 1);
                }

                //ASA
                // when we have a shared segment and want to prove congruence by ASA, always have
                // the shared segment be the S
                else if (congruence === 2) {
                    setGivenOrTraceBack([[triangle1.angs[sharedSegIndex], triangle2.angs[sharedSegIndex]],
                     [triangle1.angs[(sharedSegIndex + 2) % 3], triangle2.angs[(sharedSegIndex + 2) % 3]]], "ASA", statementKey, depth - 1);
                }

                //SAS
                // when we have a shared segment and want to prove congruence by SAS, always
                // have the shared segment be one of the S's
                else if (congruence === 3) {
                    // with probability 0.5, we choose the congruency to be side ssi, angle ssi, side ssi + 1
                    if (KhanUtil.random() < 0.5) {
                        setGivenOrTraceBack([[triangle1.angs[sharedSegIndex], triangle2.angs[sharedSegIndex]],
                            [triangle1.segs[(sharedSegIndex + 1) % 3], triangle2.segs[(sharedSegIndex + 1) % 3]]], "SAS", statementKey, depth - 1);
                    }
                    // with probability 0.5, we choose the congruency to be side ssi, angle ssi+2 % 3, side ssi+2 % 3
                    else {
                        setGivenOrTraceBack([[triangle1.angs[(sharedSegIndex + 2) % 3], triangle2.angs[(sharedSegIndex + 2) % 3]],
                            [triangle1.segs[(sharedSegIndex + 2) % 3], triangle2.segs[(sharedSegIndex + 2) % 3]]], "SAS", statementKey, depth - 1);
                    }


                }

                //AAS
                // when we have a shared segment and want to prove congruence by AAS, always
                // have the shared segment be the S
                else {
                    // with probability 0.5, we choose the congruency to be side ssi, angle ssi, angle ssi + 1
                    if (KhanUtil.random() < 0.5) {
                        setGivenOrTraceBack([[triangle1.angs[sharedSegIndex], triangle2.angs[sharedSegIndex]],
                            [triangle1.angs[(sharedSegIndex + 1) % 3], triangle2.angs[(sharedSegIndex + 1) % 3]]], "AAS", statementKey, depth - 1);
                    }
                    // with probability 0.5, we choose the congruency to be side ssi, angle ssi+2 % 3, angle ssi+1 % 3
                    else {
                        setGivenOrTraceBack([[triangle1.angs[(sharedSegIndex + 2) % 3], triangle2.angs[(sharedSegIndex + 2) % 3]],
                            [triangle1.angs[(sharedSegIndex + 1) % 3], triangle2.angs[(sharedSegIndex + 1) % 3]]], "AAS", statementKey, depth - 1);
                    }


                }

            }

            // triangle congruence case 2: triangles have vertical angles
            else if (verticalAngs != null) {
                // in this case we actually need to make sure we name the triangles correctly so that the corresponding angles are in
                // the right places: so if angle BAC is = to angle DEF, don't have the triangle congruence be BAC = FDE
                if (!triangIn(triangle2, fixedTriangles)) {
                    triangle2.segs.rotate(verticalAngs[0] - verticalAngs[1]);
                    triangle2.angs.rotate(verticalAngs[0] - verticalAngs[1]);
                }
                else if (!triangIn(triangle1, fixedTriangles)) {
                    triangle1.segs.rotate(verticalAngs[1] - verticalAngs[0]);
                    triangle1.angs.rotate(verticalAngs[1] - verticalAngs[0]);
                    verticalAngs[0] = verticalAngs[1];
                }

                finishedEqualities[[triangle1.angs[verticalAngs[0]], triangle2.angs[verticalAngs[0]]]] = "vertical angles are equal";
                finishedEqualities[[triangle2.angs[verticalAngs[0]], triangle1.angs[verticalAngs[0]]]] = "vertical angles are equal";
                finishedEqualitiesList.push([triangle1.angs[verticalAngs[0]], triangle2.angs[verticalAngs[0]]]);
                finishedEqualitiesList.push([triangle2.angs[verticalAngs[0]], triangle1.angs[verticalAngs[0]]]);

                // only use congruence theorems with angles (no SSS)
                var congruence = KhanUtil.randRange(1, 3);

                if (congruence === 1) {
                    // with probability 0.5, we choose the congruency to be angle va, side va+1, angle va+1
                    if (KhanUtil.random() < 0.5) {
                        setGivenOrTraceBack([[triangle1.segs[(verticalAngs[0] + 1) % 3], triangle2.segs[(verticalAngs[0] + 1) % 3]],
                            [triangle1.angs[(verticalAngs[0] + 1) % 3], triangle2.angs[(verticalAngs[0] + 1) % 3]]], "ASA", statementKey, depth - 1);
                    }

                    // with probability 0.5, we choose the congruency to be angle va, side va, angle va+2
                    else {
                        setGivenOrTraceBack([[triangle1.segs[verticalAngs[0]], triangle2.segs[verticalAngs[0]]],
                            [triangle1.angs[(verticalAngs[0] + 2) % 3], triangle2.angs[(verticalAngs[0] + 2) % 3]]], "ASA", statementKey, depth - 1);
                    }
                }

                else if (congruence === 2) {
                    // only option for SAS is side va, angle va, side va+1
                    setGivenOrTraceBack([[triangle1.segs[verticalAngs[0]], triangle2.segs[verticalAngs[0]]],
                     [triangle1.segs[(verticalAngs[0] + 1) % 3], triangle2.segs[(verticalAngs[0] + 1) % 3]]], "SAS", statementKey, depth - 1);
                }

                else {
                    // with probability 0.5, we choose the congruency to be angle va, angle va+1, side va
                    if (KhanUtil.random() < 0.5) {
                        setGivenOrTraceBack([[triangle1.angs[(verticalAngs[0] + 1) % 3], triangle2.angs[(verticalAngs[0] + 1) % 3]],
                         [triangle1.segs[verticalAngs[0]], triangle2.segs[verticalAngs[0]]]], "AAS", statementKey, depth - 1);
                    }

                    // with probability 0.5, we choose the congruency to be angle va, angle va+2, side va+1
                    else {
                        setGivenOrTraceBack([[triangle1.angs[(verticalAngs[0] + 2) % 3], triangle2.angs[(verticalAngs[0] + 2) % 3]],
                            [triangle1.segs[(verticalAngs[0] + 1) % 3], triangle2.segs[(verticalAngs[0] + 1) % 3]]], "AAS", statementKey, depth - 1);
                    }
                }
            }

            // triangle congruence case 3: triangles have alternate interior angles
            else if (alternateAngs != null) {
                // in this case we actually need to make sure we name the triangles correctly so that the corresponding angles are in
                // the right places: so if angle BAC is = to angle DEF, don't have the triangle congruence be BAC = FDE
                if (!triangIn(triangle2, fixedTriangles)) {
                    triangle2.segs.rotate(alternateAngs[0] - alternateAngs[1]);
                    triangle2.angs.rotate(alternateAngs[0] - alternateAngs[1]);
                }
                else if (!triangIn(triangle1, fixedTriangles)) {
                    triangle1.segs.rotate(alternateAngs[1] - alternateAngs[0]);
                    triangle1.angs.rotate(alternateAngs[1] - alternateAngs[0]);
                    alternateAngs[0] = alternateAngs[1];
                }

                finishedEqualities[[triangle1.angs[alternateAngs[0]], triangle2.angs[alternateAngs[0]]]] = "alternate interior angles are equal";
                finishedEqualities[[triangle2.angs[alternateAngs[0]], triangle1.angs[alternateAngs[0]]]] = "alternate interior angles are equal";
                finishedEqualitiesList.push([triangle1.angs[alternateAngs[0]], triangle2.angs[alternateAngs[0]]]);
                finishedEqualitiesList.push([triangle2.angs[alternateAngs[0]], triangle1.angs[alternateAngs[0]]]);

                // only use congruence theorems with angles (no SSS)
                var congruence = KhanUtil.randRange(1, 3);

                if (congruence === 1) {
                    // with probability 0.5, we choose the congruency to be angle va, side va+1, angle va+1
                    if (KhanUtil.random() < 0.5) {
                        setGivenOrTraceBack([[triangle1.segs[(alternateAngs[0] + 1) % 3], triangle2.segs[(alternateAngs[0] + 1) % 3]],
                            [triangle1.angs[(alternateAngs[0] + 1) % 3], triangle2.angs[(alternateAngs[0] + 1) % 3]]], "ASA", statementKey, depth - 1);
                    }

                    // with probability 0.5, we choose the congruency to be angle va, side va, angle va+2
                    else {
                        setGivenOrTraceBack([[triangle1.segs[alternateAngs[0]], triangle2.segs[alternateAngs[0]]],
                            [triangle1.angs[(alternateAngs[0] + 2) % 3], triangle2.angs[(alternateAngs[0] + 2) % 3]]], "ASA", statementKey, depth - 1);
                    }
                }

                else if (congruence === 2) {
                    // only option for SAS is side va, angle va, side va+1
                    setGivenOrTraceBack([[triangle1.segs[alternateAngs[0]], triangle2.segs[alternateAngs[0]]],
                     [triangle1.segs[(alternateAngs[0] + 1) % 3], triangle2.segs[(alternateAngs[0] + 1) % 3]]], "SAS", statementKey, depth - 1);
                }

                else {
                    // with probability 0.5, we choose the congruency to be angle va, angle va+1, side va
                    if (KhanUtil.random() < 0.5) {
                        setGivenOrTraceBack([[triangle1.angs[(alternateAngs[0] + 1) % 3], triangle2.angs[(alternateAngs[0] + 1) % 3]],
                            [triangle1.segs[alternateAngs[0]], triangle2.segs[alternateAngs[0]]]], "AAS", statementKey, depth - 1);
                    }

                    // with probability 0.5, we choose the congruency to be angle va, angle va+2, side va+1
                    else {
                        setGivenOrTraceBack([[triangle1.angs[(alternateAngs[0] + 2) % 3], triangle2.angs[(alternateAngs[0] + 2) % 3]],
                            [triangle1.segs[(alternateAngs[0] + 1) % 3], triangle2.segs[(alternateAngs[0] + 1) % 3]]], "AAS", statementKey, depth - 1);
                    }
                }

            }

            // triangle congruence case 4: triangles have neither shared side, vertical angles, nor alternate
            // interior angles
            else {
                //SSS
                if (congruence === 1) {
                    setGivenOrTraceBack([[triangle1.segs[0], triangle2.segs[0]], [triangle1.segs[1], triangle2.segs[1]],
                        [triangle1.segs[2], triangle2.segs[2]]], "SSS", statementKey, depth - 1);
                }

                //ASA
                else if (congruence === 2) {
                    //great, now we've got to pick a random set of angles/sides
                    var index = KhanUtil.randRange(0, 2);

                    setGivenOrTraceBack([[triangle1.angs[index], triangle2.angs[index]],
                        [triangle1.segs[(index + 1) % 3], triangle2.segs[(index + 1) % 3]],
                        [triangle1.angs[(index + 1) % 3], triangle2.angs[(index + 1) % 3]]], "ASA", statementKey, depth - 1);
                }

                //SAS
                else if (congruence === 3) {
                    var index = KhanUtil.randRange(0, 2);

                    setGivenOrTraceBack([[triangle1.segs[index], triangle2.segs[index]],
                        [triangle1.angs[index], triangle2.angs[index]],
                        [triangle1.segs[(index + 1) % 3], triangle2.segs[(index + 1) % 3]]], "SAS", statementKey, depth - 1);
                }

                //AAS
                else {
                    var index = KhanUtil.randRange(0, 2);

                    setGivenOrTraceBack([[triangle1.angs[index], triangle2.angs[index]],
                        [triangle1.angs[(index + 1) % 3], triangle2.angs[(index + 1) % 3]],
                        [triangle1.segs[(index + 2) % 3], triangle2.segs[(index + 2) % 3]]], "AAS", statementKey, depth - 1);
                }
            }
        }
        // if we know two segments to be equal
        else if (statementKey[0] instanceof Seg) {
            // for now, segments are only equal if they are part of congruent triangles
            // so, we pick two triangles which have these two segments
            var seg1 = statementKey[0];
            var seg2 = statementKey[1];

            // we also don't want triangles which are already known to be congruent
            var newTriangles = [];

            for (var i = 0; i < seg1.triangles.length; i++) {
                for (var j = 0; j < seg2.triangles.length; j++) {
                    if (!eqIn([seg1.triangles[i][0], seg2.triangles[j][0]], finishedEqualities)
                        && isRelationPossible([seg1.triangles[i][0], seg2.triangles[j][0]])
                        && !(triangIn(seg1.triangles[i][0], fixedTriangles) && triangIn(seg2.triangles[j][0], fixedTriangles))) {
                        newTriangles.push([seg1.triangles[i][0], seg2.triangles[j][0]]);
                    }
                }
            }

            // if there are no eligible triangle pairs, we simply give the segment equality as given
            if (newTriangles.length === 0) {
                finishedEqualities[statementKey] = "given";
                finishedEqualities[statementKey.reverse()] = "given";
                finishedEqualitiesList.push(statementKey);
                finishedEqualitiesList.push(statementKey.reverse());
            }
            // otherwise, change the labeling on the triangle so that the segments given in the
            // statement key are corresponding
            else {
                var trianglePair = newTriangles[KhanUtil.randRange(0, newTriangles.length - 1)];

                // there has to be a better way of doing this
                // _.indexOf doesn't work (because of === issues?)
                var index1;
                for (var i = 0; i < trianglePair[0].segs.length; i++) {
                    if (trianglePair[0].segs[i].equals(seg1)) {
                        index1 = i;
                    }
                }

                var index2;
                for (var i = 0; i < trianglePair[1].segs.length; i++) {
                    if (trianglePair[1].segs[i].equals(seg2)) {
                        index2 = i;
                    }
                }

                if (!triangIn(trianglePair[1], fixedTriangles)) {
                    trianglePair[1].segs.rotate(index1 - index2);
                    trianglePair[1].angs.rotate(index1 - index2);
                }
                else if (!triangIn(trianglePair[0], fixedTriangles)) {
                    trianglePair[0].segs.rotate(index2 - index1);
                    trianglePair[0].angs.rotate(index2 - index1);
                }

                fixedTriangles[trianglePair[0]] = true;
                fixedTriangles[trianglePair[1]] = true;

                setGivenOrTraceBack([[trianglePair[0], trianglePair[1]]], "corresponding parts of congruent triangles are congruent",
                statementKey, depth - 1);
            }
        }

        // if we know two angles to be equal
        else if (statementKey[0] instanceof Ang) {
            // two angles are equal if they are part of congruent triangles or if they are
            // vertical, or if they are alternate interior/exterior angles
            // if the given pair of angles is vertical/alternate etc., we would rather use that than
            // a triangle congruency, but this will be caught when traceBack is called on the original
            // triangles

            var ang1 = statementKey[0];
            var ang2 = statementKey[1];

            // otherwise, pick two triangles which have these two angles

            // select only for triangles which are not already known to be congruent
            var newTriangles = [];

            for (var i = 0; i < ang1.triangles.length; i++) {
                for (var j = 0; j < ang2.triangles.length; j++) {
                    if (!eqIn([ang1.triangles[i][0], ang2.triangles[j][0]], finishedEqualities)
                        && isRelationPossible([ang1.triangles[i][0], ang2.triangles[j][0]])
                        && !(triangIn(ang1.triangles[i][0], fixedTriangles) && triangIn(ang2.triangles[j][0], fixedTriangles))) {
                        newTriangles.push([ang1.triangles[i][0], ang2.triangles[j][0]]);
                    }
                }
            }


            // if there are no eligible triangle pairs, set the angle equality to given
            if (newTriangles.length === 0) {
                finishedEqualities[statementKey] = "given";
                finishedEqualities[statementKey.reverse()] = "given";
                finishedEqualitiesList.push(statementKey);
                finishedEqualitiesList.push(statementKey.reverse());
            }
            // otherwise, change the labeling on the triangle so that the angles given in the
            // statement key are corresponding
            else {
                var trianglePair = newTriangles[KhanUtil.randRange(0, newTriangles.length - 1)];

                // there has to be a better way of doing this
                // _indexOf doesn't work (because of === issues?)
                var index1;
                for (var i = 0; i < trianglePair[0].angs.length; i++) {
                    if (trianglePair[0].angs[i].equals(ang1)) {
                        index1 = i;
                    }
                }

                var index2;
                for (var i = 0; i < trianglePair[1].angs.length; i++) {
                    if (trianglePair[1].angs[i].equals(ang2)) {
                        index2 = i;
                    }
                }

                if (!triangIn(trianglePair[1], fixedTriangles)) {
                    trianglePair[1].segs.rotate(index1 - index2);
                    trianglePair[1].angs.rotate(index1 - index2);
                }
                else if (!triangIn(trianglePair[0], fixedTriangles)) {
                    trianglePair[0].segs.rotate(index2 - index1);
                    trianglePair[0].angs.rotate(index2 - index1);
                }

                fixedTriangles[trianglePair[0]] = true;
                fixedTriangles[trianglePair[1]] = true;

                setGivenOrTraceBack([[trianglePair[0], trianglePair[1]]], "corresponding parts of congruent triangles are congruent",
                statementKey, depth - 1);
            }
        }
    }
}