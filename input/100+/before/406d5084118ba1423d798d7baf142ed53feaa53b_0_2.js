function reset(){
        $("#display").text("0");
        calc="";
        displayTrunk="";
        historyTrunk="";
        $("#historyBox").val(lastHistory);
        $("#historyBox").scrollTop(99999);
    }