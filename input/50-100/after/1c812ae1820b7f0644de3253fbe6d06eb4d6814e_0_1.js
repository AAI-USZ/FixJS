function GetMin(collection, attribute) {

    

    // get the minimum value

    var min_value = _.reduce(collection, function (memo, record) {

        

        // return the lower value if available

        if (record[attribute] < memo)

            return record[attribute];

        

        // return same value

        return memo;

        

    }, collection[0][attribute]);

    

    return min_value;

    

}