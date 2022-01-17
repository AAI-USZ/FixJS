function outputFillBlanksProof(){
    var proofText = "<h3>Givens</h3>";
    var blanks = 0;

    var unsortedKeyList = _.map(finishedEqualitiesList, function(key){ return key.toString(); });
    var finishedKeys = sortEqualityList(unsortedKeyList.reverse(), finishedEqualities);

    var numberGivens = 0;
    _.each(finishedKeys, function(key){
        if(finishedEqualities[key] === "given"){
            numberGivens++;
        }
    });
    numberGivens /= 2;

    for(var i=0; i<finishedKeys.length; i+=2){
        if(finishedEqualities[finishedKeys[i]].substring(0,4) != "Same"){
            if(finishedEqualities[finishedKeys[i]] === "given"){
                numberGivens--;                
                proofText += "<div style=\"float:left\" class=\"" + divName(finishedKeys[i]) + "\">";
                proofText += prettifyEquality(finishedKeys[i]);
                if(numberGivens > 1){
                    proofText += "<code>, \\ </code> </div>";
                }
                else if(numberGivens > 0){
                    proofText += "<code>, \\  </code>and<code>\\  </code></div>";
                }
                else{
                    proofText += "</div><br><br><h3 style=\"clear:both\">Proof</h3>";
                }
            }
            else{
                if(KhanUtil.random() < 0.2){
                    proofText += "<div class=\"" + divName(finishedKeys[i]) + "\">";
                    proofText += prettifyEquality(finishedKeys[i]);
                    proofText += " because <select class=\"missingReason\" id=\""+finishedEqualities[finishedKeys[i]]+"\">"
                    +"<option></option>"
                    +"<option>side-side-side congruence</option>"
                    +"<option>angle-side-angle congruence</option>"
                    +"<option>side-angle-side congruence</option>"
                    +"<option>angle-angle-side congruence</option>"
                    +"<option>corresponding parts of congruent triangles are congruent</option>"
                    +"<option>vertical angles are equal</option>"
                    +"<option>alternate interior angles are equal</option>"
                    +"</select> </div>" + "<br>";
                    blanks++;
                }
                else if(KhanUtil.random() < 0.2){
                    if(finishedKeys[i][0] === "t"){
                        proofText += "<div id=\""+"t-"+i+"\">"
                        + "<code> \\bigtriangleup </code> <input class=\"missingStatement\"></input>"
                        + "<code> = \\bigtriangleup </code> <input class=\"missingStatement\"></input>";
                    }
                    else if(finishedKeys[i][0] === "s"){
                        proofText += "<div id=\""+"s-"+i+"\">"
                        + "<input class=\"missingStatement\"></input>"
                        + "<code> = </code><input class=\"missingStatement\"></input>";
                    }
                    else{
                        proofText += "<div id=\""+"a-"+i+"\">"
                        + "<code> \\angle </code> <input class=\"missingStatement\"></input>"
                        + "<code> = \\angle </code> <input class=\"missingStatement\"></input>";
                    }
                    proofText += " because " + finishedEqualities[finishedKeys[i]] + "</div><br>";
                    blanks++;
                }
                else{
                    proofText += "<div class=\"" + divName(finishedKeys[i]) + "\">";
                    proofText += prettifyEquality(finishedKeys[i]);
                    proofText += " because " + finishedEqualities[finishedKeys[i]] + "</div>" + "<br>";
                }
            }
        }

    }

    if(blanks < 2){
        return outputFillBlanksProof();
    }

    return [proofText,blanks];

}