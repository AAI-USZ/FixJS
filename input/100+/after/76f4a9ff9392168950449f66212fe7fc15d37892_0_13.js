function eqIn(item, object) {
    var list;
    var item1;
    var item2;

    if (!_.isArray(object)) {
        list = _.keys(object);
        item1 = item[0].toString();
        item2 = item[1].toString();

        for (var i = 0; i < list.length; i++) {
            var key1 = list[i].split(",")[0];
            var key2 = list[i].split(",")[1];
            if (item1 === (key1) && item2 === (key2) ||
                item1 === (key2) && item2 === (key1)) {
                return true;
            }
        }
    }
    else {
        list = object;
        item1 = item[0];
        item2 = item[1];

        for (var i = 0; i < list.length; i++) {
            if ((item1.equals(list[i][0]) && item2.equals(list[i][1])) || (item1.equals(list[i][1]) && item2.equals(list[i][0]))) {
                return true;
            }
        }


    }

    return false;
}