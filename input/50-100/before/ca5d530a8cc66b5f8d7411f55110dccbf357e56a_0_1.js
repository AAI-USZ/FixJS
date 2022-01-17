function replaceQuery(query, filter, negated){
    if ($(query) == undefined){
        return false;
    }
    if (negated == undefined){
        negated = false;
    }
    if (negated){
        $(query).val('!' + filter);
    }
    else {
        $(query).val(filter);
    }
    return true;
}