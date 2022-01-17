function sortEqualityList(equalityList, equalityObject) {
    var dupCheck = {};
    var newEqualityList = [];
    for (var i = 0; i < equalityList.length; i++) {
        if (equalityObject[equalityList[i]] === "given" && !(equalityList[i] in dupCheck || equalityList[i].reverse() in dupCheck)) {
            newEqualityList.unshift(equalityList[i]);
            dupCheck[equalityList[i]] = true;
        }
        else if(!(equalityList[i] in dupCheck || equalityList[i].reverse() in dupCheck)) {
            newEqualityList.push(equalityList[i]);
            dupCheck[equalityList[i]] = true;
        }
    }
    var sortedEqualityList = _.clone(newEqualityList);
    for (var i = 0; i < newEqualityList.length; i++) {
        if (equalityObject[newEqualityList[i]] === "vertical angles are equal" || equalityObject[newEqualityList[i]] === "alternate interior angles are equal") {
            sortedEqualityList[i - 1] = newEqualityList[i];
            sortedEqualityList[i] = newEqualityList[i - 1];
        }
    }

    return sortedEqualityList;
}