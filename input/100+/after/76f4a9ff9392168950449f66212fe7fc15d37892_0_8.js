function outputBadProof() {
    var validStatements = 0;
    var invalidStatements = 0;
    var valid = null;
    var before = KhanUtil.random() < 0.5;
    var count = 0;

    var filteredDupKeys = _.filter(_.keys(finishedEqualities), function(key) {
        return finishedEqualities[key] != "given" && finishedEqualities[key].substring(0, 4) != "Same";
    });
    // can't use reverse to check to duplicate keys because keys are strings, can't use _.difference because
    // sometimes difference is 0 between string but they represent different equalities, so for now use
    // a clunky way to filter out duplicate
    var filteredKeys = [];
    for (var i = 0; i < filteredDupKeys.length; i += 2) {
        filteredKeys[i / 2] = filteredDupKeys[i];
    }
    while (validStatements < 2 && count < 100) {
        //pick two things to be equal
        var newEquality = filteredKeys[(filteredKeys.length - validStatements - 1)];
        if (!eqIn(newEquality, knownEqualities)) {
            knownEqualities[newEquality] = finishedEqualities[newEquality];
            knownEqualities[filteredDupKeys[_.indexOf(filteredDupKeys, newEquality) + 1]] = finishedEqualities[newEquality];
            validStatements++;
        }
        count++;
    }

    var invalid;
    // now pick an invalid statement
    while (invalidStatements < 1) {
        //pick two things to be equal
        var equalityType = KhanUtil.randRange(1, 3);
        if (equalityType === 1) {
            var seg1 = KhanUtil.randFromArray(SEGMENTS);
            var seg2 = KhanUtil.randFromArray(SEGMENTS);

            if (!checkSegEqual(seg1, seg2, "CPCTC")) {
                invalid = [seg1, seg2];
                knownEqualities[invalid] = "corresponding parts of congruent triangles are congruent";
                knownEqualities[invalid.reverse()] = "corresponding parts of congruent triangles are congruent";
                invalidStatements++;
            }
        }
        else if (equalityType === 2) {
            var ang1 = KhanUtil.randFromArray(ANGLES);
            var ang2 = KhanUtil.randFromArray(ANGLES);

            var reasons = KhanUtil.shuffle(["corresponding parts of congruent triangles are congruent",
                 "vertical angles are equal", "alternate interior angles are equal"]);
            for (var i = 0; i < reasons.length; i++) {
                if (!checkAngEqual(ang1, ang2, reasons[i])) {
                    invalid = [ang1, ang2];
                    knownEqualities[invalid] = reasons[i];
                    knownEqualities[invalid.reverse()] = reasons[i];
                    invalidStatements++;
                }
            }
        }
        else {
            var triangle1 = KhanUtil.randFromArray(TRIANGLES);
            var triangle2 = KhanUtil.randFromArray(TRIANGLES);

            // in this case you have to also try every rotation (if they aren't fixed)
            // because honestly, triangles are the devil
            var rotation = KhanUtil.randRange(0, 2);
            if (!triangIn(triangle1, fixedTriangles)) {
                triangle1.segs.rotate(rotation);
                triangle1.angs.rotate(rotation);
            }
            else if (!triangIn(triangle2, fixedTriangles)) {
                triangle2.segs.rotate(rotation);
                triangle2.angs.rotate(rotation);
            }

            var reasons = KhanUtil.shuffle(["SSS", "ASA", "SAS", "AAS"]);
            for (var i = 0; i < reasons.length; i++) {
                if (!checkTriangleCongruent(triangle1, triangle2, reasons[i])) {
                    invalid = [triangle1, triangle2];
                    knownEqualities[invalid] = reasons[i];
                    knownEqualities[invalid.reverse()] = reasons[i];
                    invalidStatements++;
                }
            }
        }
    }

    count = 0;
    while (validStatements < 4 && count < 100) {
        //pick two things to be equal
        var equalityType = KhanUtil.randRange(1, 3);
        if (equalityType === 1) {
            var seg1 = KhanUtil.randFromArray(SEGMENTS);
            var seg2 = KhanUtil.randFromArray(SEGMENTS);

            if (isRelationPossible([seg1, seg2]) && !eqIn([seg1, seg2], knownEqualities) && !seg1.equals(seg2) && checkSegEqual(seg1, seg2, "CPCTC")) {
                validStatements++;
            }
        }
        else if (equalityType === 2) {
            var ang1 = KhanUtil.randFromArray(ANGLES);
            var ang2 = KhanUtil.randFromArray(ANGLES);

            if (isRelationPossible([ang1, ang2]) && !eqIn([ang1, ang2], knownEqualities) && !ang1.equals(ang2) &&
                (checkAngEqual(ang1, ang2, "vertical angles") || checkAngEqual(ang1, ang2, "alternate angles")
                    || checkAngEqual(ang1, ang2, "CPCTC"))) {
                validStatements++;
            }
        }
        else {
            var triangle1 = KhanUtil.randFromArray(TRIANGLES);
            var triangle2 = KhanUtil.randFromArray(TRIANGLES);

            var rotation = KhanUtil.randRange(0, 2);
            if (!triangIn(triangle1, fixedTriangles)) {
                triangle1.segs.rotate(rotation);
                triangle1.angs.rotate(rotation);
            }
            else if (!triangIn(triangle2, fixedTriangles)) {
                triangle2.segs.rotate(rotation);
                triangle2.angs.rotate(rotation);
            }


            if (isRelationPossible([triangle1, triangle2]) && !eqIn([triangle1, triangle2], knownEqualities) && !triangle1.equals(triangle2) &&
                (checkTriangleCongruent(triangle1, triangle2, "SSS") || checkTriangleCongruent(triangle1, triangle2, "ASA")
                || checkTriangleCongruent(triangle1, triangle2, "SAS") || checkTriangleCongruent(triangle1, triangle2, "AAS"))) {
                validStatements++;
                fixedTriangles[triangle1] = true;
                fixedTriangles[triangle2] = true;
            }
        }
        count++;
    }

    // now construct the proof we want to hand to the exercise
    var proofText = "<h3>Givens</h3>";
    var knownKeys = sortEqualityList(_.keys(knownEqualities), knownEqualities);

    var numberGivens = 0;
    _.each(knownKeys, function(key) {
        if (knownEqualities[key] === "given") {
            numberGivens++;
        }
    });
    numberGivens /= 2;
    console.log(knownKeys);

    for (var i = 0; i < knownKeys.length; i += 2) {
        if (knownEqualities[knownKeys[i]].substring(0, 4) != "Same") {
            if (knownEqualities[knownKeys[i]] === "given") {
                numberGivens--;
                proofText += "<div style=\"float:left\" class=\"" + divName(knownKeys[i]) + "\">";
                proofText += prettifyEquality(knownKeys[i]);
                if (numberGivens > 1) {
                    proofText += "<code>, \\ </code> </div>";
                }
                else if (numberGivens > 0) {
                    proofText += "<code>, \\  </code>and<code>\\  </code></div>";
                }
                else {
                    proofText += "</div><br><br><h3 style=\"clear:both\">Proof</h3>";
                }
            }
            else {
                proofText += "<div class=\"" + divName(knownKeys[i]) + "\">";
                proofText += prettifyEquality(knownKeys[i]);
                proofText += " because " + knownEqualities[knownKeys[i]] + "</div><br>";
            }
        }

    }

    if (!eqIn(finalRelation, knownEqualities)) {
        if (eqIn(finalRelation, finishedEqualities)) {
            proofText += "<div class=\"" + divName(finalRelation.toString()) + "\">";
            proofText += prettifyEquality(finalRelation);
            proofText += " because " + finishedEqualities[finalRelation] + "</div>" + "<br>";
        }
        else {
            proofText += "<div class=\"" + divName(finalRelation.toString()) + "\">";
            proofText += prettifyEquality(finalRelation);
            if (finalRelation[0] instanceof Triang) {
                proofText += " because " + KhanUtil.randFromArray(["SSS", "ASA", "SAS", "AAS"]) + "</div>" + "<br>";
            }
            else if (finalRelation[0] instanceof Ang) {
                proofText += " because "
                + KhanUtil.randFromArray(["vertical angles are equal", "alternate angles are equal", "corresponding parts of congruent triangles are congruent"])
                + "</div>" + "<br>";
            }
            else {
                proofText += " because " + "corresponding parts of congruent triangles are congruent" + "</div>" + "<br>";
            }
        }
    }


    valid = KhanUtil.randFromArray(_.filter(_.keys(knownEqualities), function(key) {
       return knownEqualities[key] != "given" && knownEqualities[key].substring(0, 4) != "Same" && _.difference(key.toString().split(""), invalid.toString().split("")).length > 0;
    }));


    return [proofText, prettifyEquality(invalid), prettifyEquality(valid)];

}