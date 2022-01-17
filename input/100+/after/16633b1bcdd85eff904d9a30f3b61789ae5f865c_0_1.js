function create_and_write_data_to_cookie(pairToModify, newValue) {
    var oldPairingData = read_cookie(pair_cookie_name);
    var newPairingData = new Array();
    var matchingPairFound = false;

    $(oldPairingData).each(function(index, pairData) {
        var pairNames = pairData.slice(0, -2);
        if (pairNames == pairToModify) {
            matchingPairFound = true;
            newPairingData.push(pairNames + "-" + newValue);
            return;
        }
        newPairingData.push(pairData);
    });
    if (!matchingPairFound){
        newPairingData.push(pairToModify + "-" + newValue);
    };

    update_pair_cookie(newPairingData);
}