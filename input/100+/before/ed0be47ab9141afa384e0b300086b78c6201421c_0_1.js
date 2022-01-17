function initProof(segs, angs, triangles, supplementaryAngs, altIntAngs, depth, givProb, toProveType) {
    userProofDone = false;

    knownEqualities = {};

    finishedEqualities = {};
    finishedEqualitiesList = [];

    fixedTriangles = {};

    SEGMENTS = segs;
    ANGLES = angs;
    TRIANGLES = triangles;

    supplementaryAngles = supplementaryAngs;

    altInteriorAngs = altIntAngs;

    numHints = 3;

    givenProbability = givProb;

    //populate knownEqualities based on reflexivity
    for (var i = 0; i < SEGMENTS.length; i++) {
        knownEqualities[[SEGMENTS[i], SEGMENTS[i]]] = "Same segment";
        finishedEqualities[[SEGMENTS[i], SEGMENTS[i]]] = "Same segment";
    }

    for (var i = 0; i < ANGLES.length; i++) {
        knownEqualities[[ANGLES[i], ANGLES[i]]] = "Same angle";
        finishedEqualities[[ANGLES[i], ANGLES[i]]] = "Same angle";
    }

    for (var i = 0; i < TRIANGLES.length; i++) {
        knownEqualities[[TRIANGLES[i], TRIANGLES[i]]] = "Same triangle";
        finishedEqualities[[TRIANGLES[i], TRIANGLES[i]]] = "Same triangle";
    }



    // populates finishedEqualities with a proof traced back from the statement to be proven
    var equalityType;
    while (true) {
        if (toProveType === "all") {
            equalityType = KhanUtil.randFromArray(["triangle", "angle", "segment"]);
        }
        else {
            equalityType = toProveType;
        }
        if (equalityType === "triangle") {
            // pick some triangles to be congruent, this will be the statement to be proven
            var indices = KhanUtil.randRangeUnique(0, TRIANGLES.length, 2);
            var triangle1 = TRIANGLES[indices[0]];
            var triangle2 = TRIANGLES[indices[1]];

            //ensure these triangles can be congruent
            if (isRelationPossible([triangle1, triangle2]) && !triangle1.equals(triangle2)) {
                finalRelation = [triangle1, triangle2];
                traceBack([triangle1, triangle2], depth);
                break;
            }
        }
        else if (equalityType === "angle") {
            // pick some angles to be congruent, this will be the statement to be proven
            var indices = KhanUtil.randRangeUnique(0, ANGLES.length, 2);
            var angle1 = ANGLES[indices[0]];
            var angle2 = ANGLES[indices[1]];

            //ensure these angles can be congruent
            if (isRelationPossible([angle1, angle2]) && !angle1.equals(angle2)) {
                finalRelation = [angle1, angle2];
                traceBack([angle1, angle2], depth);
                break;
            }
        }
        else {
            // pick some segments to be congruent, this will be the statement to be proven
            var indices = KhanUtil.randRangeUnique(0, SEGMENTS.length, 2);
            var segment1 = SEGMENTS[indices[0]];
            var segment2 = SEGMENTS[indices[1]];

            //ensure these segments can be congruent
            if (isRelationPossible([segment1, segment2]) && !segment1.equals(segment2)) {
                finalRelation = [segment1, segment2];
                traceBack([segment1, segment2], depth);
                break;
            }
        }
    }

    // if an equality was picked that cannot be proved from anything else in the figure,
    // or the proof is too short, just start over
    // TODO: replace the provetype === all shortcut
    if (finishedEqualities[finalRelation] === "given"
        || (_.keys(finishedEqualities).length < 5 + SEGMENTS.length + ANGLES.length + TRIANGLES.length && toProveType === "all")) {
        return initProof(segs, angs, triangles, supplementaryAngs, altIntAngs, depth, givProb, toProveType);
    }

    // prune givens for any statements implied by other statements
    // TODO

    // copy givens to knownEqualities
    var givens = {};
    var keys = _.keys(finishedEqualities);
    for (var i = 0; i < keys.length; i++) {
        if (finishedEqualities[keys[i]] === "given") {
            givens[keys[i]] = "given";
        }
    }

    knownEqualities = _.extend(knownEqualities, givens);

    var newHTML = "";
    var givenKeys = _.keys(givens);
    for (var i = 0; i < givenKeys.length; i += 2) {
        newHTML += prettifyEquality(givenKeys[i]);

        if (i === givenKeys.length - 4) {
            newHTML += " and ";
        }
        else if (i === givenKeys.length - 2) {
            newHTML += "";
        }
        else {
            newHTML += ", ";
        }
    }

    return [newHTML, prettifyEquality(finalRelation)];
}