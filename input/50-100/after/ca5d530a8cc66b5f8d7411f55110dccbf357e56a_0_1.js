function replaceQuery(query, filter, negated){
    if ($(query) == undefined){
        return false;
    }
    if (negated == undefined){
        negated = false;
    }
    var newQuery = filter;
    if (negated){
        $(query).val('!' + newQuery);
    }
    else {
        $(query).val(newQuery);
    }
    return true;
}