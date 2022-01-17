function reset(){
        $("#display").text("0");
        calc="";
        lastchar.type = "NaN";
        displayTrunk="";
        historyTrunk="";
        $("#historyBox").val(lastHistory);
        $("#historyBox").scrollTop(99999);
    }