function checkTriangleForHint(triangle1, triangle2, equalityObject) {
    // to check if this pair of triangles is already in knownEqualities, we need to check
    // if any corresponding rotation is in knownEqualities

    // for(var i=0; i<3; i++){
    //     triangle1.segs.rotate(1);
    //     triangle1.angs.rotate(1);

    //     triangle2.segs.rotate(1);
    //     triangle2.angs.rotate(1);

    //     if(eqIn([triangle1, triangle2], equalityObject)){
    //         return [];
    //     }
    // }

    //SSS
    if (eqIn([triangle1.segs[0], triangle2.segs[0]], equalityObject) && eqIn([triangle1.segs[1], triangle2.segs[1]], equalityObject)
        && eqIn([triangle1.segs[2], triangle2.segs[2]], equalityObject)) {
        return [[triangle1.segs[0], triangle2.segs[0]], [triangle1.segs[1], triangle2.segs[1]], [triangle1.segs[2], triangle2.segs[2]]];
    }

    //ASA
    for (var i = 0; i < 3; i++) {
        if (eqIn([triangle1.angs[i], triangle2.angs[i]], equalityObject)
            && eqIn([triangle1.segs[(i + 1) % 3], triangle2.segs[(i + 1) % 3]], equalityObject)
            && eqIn([triangle1.angs[(i + 1) % 3], triangle2.angs[(i + 1) % 3]], equalityObject)) {
            return [[triangle1.angs[i], triangle2.angs[i]],
             [triangle1.segs[(i + 1) % 3], triangle2.segs[(i + 1) % 3]], [triangle1.angs[(i + 1) % 3], triangle2.angs[(i + 1) % 3]]];
        }
    }

    //SAS
    for (var i = 0; i < 3; i++) {
        if (eqIn([triangle1.segs[i], triangle2.segs[i]], equalityObject) && eqIn([triangle1.angs[i], triangle2.angs[i]], equalityObject)
        && eqIn([triangle1.segs[(i + 1) % 3], triangle2.segs[(i + 1) % 3]], equalityObject)) {
            return [[triangle1.segs[i], triangle2.segs[i]],
             [triangle1.angs[i], triangle2.angs[i]], [triangle1.segs[(i + 1) % 3], triangle2.segs[(i + 1) % 3]]];
        }
    }


    //AAS
    for (var i = 0; i < 3; i++) {
        if (eqIn([triangle1.angs[i], triangle2.angs[i]], equalityObject)
            && eqIn([triangle1.angs[(i + 1) % 3], triangle2.angs[(i + 1) % 3]], equalityObject)
            && eqIn([triangle1.segs[(i + 2) % 3], triangle2.segs[(i + 2) % 3]], equalityObject)) {
            return [[triangle1.angs[i], triangle2.angs[i]],
             [triangle1.angs[(i + 1) % 3], triangle2.angs[(i + 1) % 3]], [triangle1.segs[(i + 2) % 3], triangle2.segs[(i + 2) % 3]]];
        }
    }

    //AAS part II (revenge of the AAS)
    for (var i = 0; i < 3; i++) {
        if (eqIn([triangle1.angs[i], triangle2.angs[i]], equalityObject)
            && eqIn([triangle1.angs[(i + 1) % 3], triangle2.angs[(i + 1) % 3]], equalityObject)
            && eqIn([triangle1.segs[i], triangle2.segs[i]], equalityObject)) {
            return [[triangle1.angs[i], triangle2.angs[i]],
             [triangle1.angs[(i + 1) % 3], triangle2.angs[(i + 1) % 3]], [triangle1.segs[i], triangle2.segs[i]]];
        }
    }


    return [];

}