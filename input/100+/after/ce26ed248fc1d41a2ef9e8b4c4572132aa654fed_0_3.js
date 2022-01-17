function outputKnownProof() {
    var proofText = "<h3>Givens</h3>";

    var knownKeysList = sortEqualityList(knownEqualitiesList, knownEqualities);
    var knownKeys = _.map(knownKeysList, function(key){ return key.toString(); });

    var numberGivens = 0;
    _.each(knownKeys, function(key) {
        if (knownEqualities[key] === "given") {
            numberGivens++;
        }
    });

    for (var i = 0; i < knownKeys.length; i ++) {
        if (knownEqualities[knownKeys[i]].substring(0, 4) != "Same") {
            if (knownEqualities[knownKeys[i]] === "given") {
                numberGivens--;
                proofText += "<div style=\"float:left\" class=\"" + divName(knownKeys[i]) + "\">";
                proofText += prettifyEquality(knownKeys[i]);
                if (numberGivens > 1) {
                    proofText += "<code>, \\ </code> </div>";
                }
                else if (numberGivens > 0) {
                    proofText += "<code>, \\  </code>and<code>\\  </code></div>";
                }
                else {
                    proofText += "</div><br><br><h3 style=\"clear:both\">Proof</h3>";
                }
            }
            else {
                proofText += "<div class=\"" + divName(knownKeys[i]) + "\">";
                proofText += prettifyEquality(knownKeys[i]);
                proofText += " because " + knownEqualities[knownKeys[i]] + "</div>" + "<br>";
            }

        }

    }

    return proofText;
}