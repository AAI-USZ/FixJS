function setGivenOrTraceBack(keys, reason, oldKey, dep){
    var isPossibleAndNew = true;
    for(var i=0; i<keys.length; i++){
        isPossibleAndNew = isPossibleAndNew && isRelationPossible(keys[i]) && !eqIn(keys[i], finishedEqualities);
    }
    if(isPossibleAndNew){

        finishedEqualities[oldKey] = reason;
        finishedEqualities[oldKey.reverse()] = reason;
        finishedEqualitiesList.push(oldKey.toString());
        finishedEqualitiesList.push(oldKey.reverse().toString());

        if(oldKey[0] instanceof Triang){
            fixedTriangles[oldKey[0]] = true;
            fixedTriangles[oldKey[1]] = true;
        }

        // set the statements in keys to be true
        var key;
        for(var i=0; i<keys.length; i++){
            key = keys[i];
            console.log("relation " +key+" is possible");

            if(KhanUtil.random() < givenProbability){
                console.log("setting relation "+key+" to Given");
                finishedEqualities[key] = "given";
                finishedEqualities[key.reverse()] = "given";
                finishedEqualitiesList.push(key.toString());
                finishedEqualitiesList.push(key.reverse().toString());

                if(key[0] instanceof Triang){
                    fixedTriangles[key[0]] = true;
                    fixedTriangles[key[1]] = true;
                }
            }
            else{
                traceBack(key, dep);
            }
        }   
    }
    else{
        console.log("relation " +keys+" is not possible, tracing back "+oldKey);
        if(KhanUtil.random() < givenProbability){
            // you have failed me for the last time
            finishedEqualities[oldKey] = "given";
            finishedEqualities[oldKey.reverse()] = "given";
            finishedEqualitiesList.push(oldKey.toString());
            finishedEqualitiesList.push(oldKey.reverse().toString());

            if(oldKey[0] instanceof Triang){
                fixedTriangles[oldKey[0]] = true;
                fixedTriangles[oldKey[1]] = true;
            }
        }
        else{
            traceBack(oldKey, dep+1);
        }
    }
}