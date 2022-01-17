function compute(){
        var result = eval(calc)	

        $("#display").text(updateDisplay(result));
        lastResult = result;
        lastchar.type = "Nan";
        lastchar.value = "";
        calc = "";
	
        $("#historyBox").val($("#historyBox").val()+historyTrunk+"\n= "+updateDisplay(result)+"\n\n");
        $("#historyBox").scrollTop(99999);
	
        displayTrunk = "";
        historyTrunk = "";
	
        if(window.sankore){
            window.sankore.setPreference('historyTxt', $("#historyBox").val());
        };
	
        lastHistory = $("#historyBox").val();
    }