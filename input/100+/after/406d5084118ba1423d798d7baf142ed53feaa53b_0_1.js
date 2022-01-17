function compute(){
        var result;
        //alert(calc)
        if(calc.length <= 1)
            result = eval(calc);
        else{
            var fNumber, lNumber, operation = "", fMinus = "";
            if(calc.charAt(0) == '-'){
                fMinus = "-";
                calc = calc.substr(1, calc.length);
            }
            operation = (calc.indexOf("+", 0) != -1)?calc.charAt(calc.indexOf("+", 0)):((calc.indexOf("*", 0) != -1)?calc.charAt(calc.indexOf("*", 0)):((calc.indexOf("/", 0) != -1)?calc.charAt(calc.indexOf("/", 0)):((calc.indexOf("-", 0) != -1)?calc.charAt(calc.indexOf("-", 0)):"")));
            fNumber = fMinus + calc.substring(0, calc.indexOf(operation, 0));
            lNumber = calc.substring(calc.indexOf(operation, 0)+1, calc.length);
            //alert(fNumber + " | " + operation + " | " + lNumber)
            result = calcIt(fNumber, operation, lNumber);
        }

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
        }
	
        lastHistory = $("#historyBox").val();
    }