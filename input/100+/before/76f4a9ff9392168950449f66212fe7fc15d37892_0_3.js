function outputFinishedProof() {
    var proofText = "<h3>Givens</h3>";

    var unsortedKeyList = _.map(finishedEqualitiesList, function(key) { return key.toString(); });
    var finishedKeys = sortEqualityList(unsortedKeyList.reverse(), finishedEqualities);

    var possibleValids = [];

    var numberGivens = 0;
    _.each(finishedKeys, function(key) {
        if (finishedEqualities[key] === "given") {
            numberGivens++;
        }
    });
    numberGivens /= 2;
    for (var i = 0; i < finishedKeys.length; i += 2) {
        if (finishedEqualities[finishedKeys[i]].substring(0, 4) != "Same") {
            if (finishedEqualities[finishedKeys[i]] === "given") {
                numberGivens--;
                proofText += "<div style=\"float:left\" class=\"" + divName(finishedKeys[i]) + "\">";
                proofText += prettifyEquality(finishedKeys[i]);
                if (numberGivens > 1) {
                    proofText += "<code>, \\ </code> </div>";
                }
                else if (numberGivens > 0) {
                    proofText += "<code>, \\  </code>and<code>\\  </code></div>";
                }
                else {
                    proofText += "</div><br><br><h3 style=\"clear:both\">Proof</h3>";
                }

                possibleValids.push(prettifyEquality(finishedKeys[i]));
            }
            else {
                proofText += "<div class=\"" + divName(finishedKeys[i]) + "\">";
                proofText += prettifyEquality(finishedKeys[i]);
                proofText += " because " + finishedEqualities[finishedKeys[i]] + "</div><br>";

                possibleValids.push(prettifyEquality(finishedKeys[i]));
            }
        }

    }

    var indices = KhanUtil.randRangeUnique(0, possibleValids.length - 1, 2);

    return [proofText, possibleValids[indices[0]], possibleValids[indices[1]]];
}