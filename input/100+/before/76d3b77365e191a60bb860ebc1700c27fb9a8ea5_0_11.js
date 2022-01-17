function sortEqualityList(equalityList, equalityObject) {
    var newEqualityList = [];
    for (var i = 0; i < equalityList.length; i++) {
        if (equalityObject[equalityList[i]] === "given") {
            newEqualityList.unshift(equalityList[i]);
        }
        else {
            newEqualityList.push(equalityList[i]);
        }
    }
    var sortedEqualityList = _.clone(newEqualityList);
    for (var i = 0; i < newEqualityList.length; i++) {
        if (equalityObject[newEqualityList[i]] === "vertical angles are equal" || equalityObject[newEqualityList[i]] === "alternate interior angles are equal") {
            sortedEqualityList[i - 2] = newEqualityList[i];
            sortedEqualityList[i] = newEqualityList[i - 2];
        }
    }

    return sortedEqualityList;
}