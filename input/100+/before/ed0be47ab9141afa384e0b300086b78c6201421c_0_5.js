function outputKnownProof() {
    var proofText = "<h3>Givens</h3>";

    var knownKeys = sortEqualityList(_.keys(knownEqualities), knownEqualities);

    var numberGivens = 0;
    _.each(knownKeys, function(key) {
        if (knownEqualities[key] === "given") {
            numberGivens++;
        }
    });
    numberGivens /= 2;
    for (var i = 0; i < knownKeys.length; i += 2) {
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