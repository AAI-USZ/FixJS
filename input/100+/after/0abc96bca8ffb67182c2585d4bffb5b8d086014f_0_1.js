function checkTriangleCongruent(triangle1, triangle2, reason) {
    // to check if this pair of triangles is already in knownEqualities, we need to check
    // if any corresponding rotation is in knownEqualities
    var isRotation = false;
    for (var i = 0; i < 3; i++) {
        triangle1.segs.rotate(1);
        triangle1.angs.rotate(1);

        triangle2.segs.rotate(1);
        triangle2.angs.rotate(1);


        if (eqIn([triangle1, triangle2], knownEqualities)) {
            isRotation = true;
        }
    }
    if (isRotation) {
        return true;
    }


    //SSS
    if (eqIn([triangle1.segs[0], triangle2.segs[0]], knownEqualities) && eqIn([triangle1.segs[1], triangle2.segs[1]], knownEqualities)
        && eqIn([triangle1.segs[2], triangle2.segs[2]], knownEqualities)) {

        if (reason === "SSS") {
            knownEqualities[[triangle1, triangle2]] = "SSS";
            knownEqualities[[triangle2, triangle1]] = "SSS";
            knownEqualitiesList.push([triangle1, triangle2]);
            animationObjects = [[triangle1.segs[0], triangle2.segs[0]],[triangle1.segs[1], triangle2.segs[1]],[triangle1.segs[2], triangle2.segs[2]]];
            return true;
        }
    }

    //ASA
    for (var i = 0; i < 3; i++) {
        if (eqIn([triangle1.angs[i], triangle2.angs[i]], knownEqualities)
            && eqIn([triangle1.segs[(i + 1) % 3], triangle2.segs[(i + 1) % 3]], knownEqualities)
            && eqIn([triangle1.angs[(i + 1) % 3], triangle2.angs[(i + 1) % 3]], knownEqualities)) {

            if (reason === "ASA") {
                knownEqualities[[triangle1, triangle2]] = "ASA";
                knownEqualities[[triangle2, triangle1]] = "ASA";
                knownEqualitiesList.push([triangle1, triangle2]);
                animationObjects = [[triangle1.angs[i], triangle2.angs[i]],[triangle1.segs[(i + 1) % 3], triangle2.segs[(i + 1) % 3]],
                                    [triangle1.angs[(i + 1) % 3], triangle2.angs[(i + 1) % 3]]];
                return true;
            }
        }
    }

    //SAS
    for (var i = 0; i < 3; i++) {
        if (eqIn([triangle1.segs[i], triangle2.segs[i]], knownEqualities) && eqIn([triangle1.angs[i], triangle2.angs[i]], knownEqualities)
        && eqIn([triangle1.segs[(i + 1) % 3], triangle2.segs[(i + 1) % 3]], knownEqualities)) {

            if (reason === "SAS") {
                knownEqualities[[triangle1, triangle2]] = "SAS";
                knownEqualities[[triangle2, triangle1]] = "SAS";
                knownEqualitiesList.push([triangle1, triangle2]);
                animationObjects = [[triangle1.segs[i], triangle2.segs[i]], [triangle1.angs[i], triangle2.angs[i]],
                                    [triangle1.segs[(i + 1) % 3], triangle2.segs[(i + 1) % 3]]];
                return true;
            }
        }
    }


    //AAS
    for (var i = 0; i < 3; i++) {
        if (eqIn([triangle1.angs[i], triangle2.angs[i]], knownEqualities)
            && eqIn([triangle1.angs[(i + 1) % 3], triangle2.angs[(i + 1) % 3]], knownEqualities)
            && eqIn([triangle1.segs[(i + 2) % 3], triangle2.segs[(i + 2) % 3]], knownEqualities)) {

            if (reason === "AAS") {
                knownEqualities[[triangle1, triangle2]] = "AAS";
                knownEqualities[[triangle2, triangle1]] = "AAS";
                knownEqualitiesList.push([triangle1, triangle2]);
                animationObjects = [[triangle1.angs[i], triangle2.angs[i]], [triangle1.angs[(i + 1) % 3], triangle2.angs[(i + 1) % 3]],
                                    [triangle1.segs[(i + 2) % 3], triangle2.segs[(i + 2) % 3]]];
                return true;
            }
        }
    }

    //AAS part II (revenge of the AAS)
    for (var i = 0; i < 3; i++) {
        if (eqIn([triangle1.angs[i], triangle2.angs[i]], knownEqualities)
            && eqIn([triangle1.angs[(i + 1) % 3], triangle2.angs[(i + 1) % 3]], knownEqualities)
            && eqIn([triangle1.segs[i], triangle2.segs[i]], knownEqualities)) {

            if (reason === "AAS") {
                knownEqualities[[triangle1, triangle2]] = "AAS";
                knownEqualities[[triangle2, triangle1]] = "AAS";
                knownEqualitiesList.push([triangle1, triangle2]);
                animationObjects = [[triangle1.angs[i], triangle2.angs[i]], [triangle1.angs[(i + 1) % 3], triangle2.angs[(i + 1) % 3]],
                                    [triangle1.segs[i], triangle2.segs[i]]]
                return true;
            }
        }
    }


    return false;

}