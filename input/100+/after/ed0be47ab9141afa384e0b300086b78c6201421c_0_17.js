function divName(equalityString) {
    if (equalityString[0] === "s") {
        return equalityString.substring(3, 5) + "-" + equalityString.substring(9, 11);
    }
    else if (equalityString[0] === "a") {
        return equalityString.substring(3, 6) + "-" + equalityString.substring(10, 13);
    }
    else {
        var triangle1 = _.find(TRIANGLES, function(triang) {
            return _.difference(equalityString.substring(0, 11).split(""), triang.toString().split("")).length === 0;
        });

        var triangle2 = _.find(TRIANGLES, function(triang) {
            return _.difference(equalityString.substring(12, 23).split(""), triang.toString().split("")).length === 0;
        });

        return triangle1.segs[0].toString().substring(3, 5) + " " + triangle1.segs[1].toString().substring(3, 5) + " "
        + triangle1.segs[2].toString().substring(3, 5) + " " + triangle2.segs[0].toString().substring(3, 5) + "2 "
        + triangle2.segs[1].toString().substring(3, 5) + "2 " + triangle2.segs[2].toString().substring(3, 5) + "2";
    }
}