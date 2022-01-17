function press(pressedChar){
    var now = new Date();
    var diff = tstLastPressTime && now.getTime() - tstLastPressTime.getTime();

    if (diff && diff < 80 ) {
        return;
    }

    inputTarget = tstInputTarget;
    var singleButtonMode = inputTarget.getAttribute("singleButtonMode");
    if (singleButtonMode)
        inputTarget.value = "";

    if (pressedChar.length == 1) {
        inputTarget.value += getRightCaseValue(pressedChar);

    } else {
        switch (pressedChar) {
            case 'backspace':
                inputTarget.value = inputTarget.value.substring(0,inputTarget.value.length-1);
                break;
            case 'done':
                touchScreenEditFinish(inputTarget);
                break;
            case 'space':
                inputTarget.value += ' ';
                break;
            case 'whitespace':
                inputTarget.value += ' ';
                break;
            case 'return':
                inputTarget.value += "\n";
                break;
            case 'apostrophe':
                inputTarget.value += "'";
                break;
            case 'na':
                inputTarget.value = "N/A";
                break;
            case 'abc':
                tstUserKeyboardPref = 'abc';
                __$('keyboard').innerHTML = getPreferredKeyboard();
                if (typeof(saveUserKeyboardPref) != 'undefined'){
                    saveUserKeyboardPref('abc');
                }
                break;
            case 'qwerty':
                tstUserKeyboardPref = 'qwerty';
                __$('keyboard').innerHTML = getPreferredKeyboard();
                if (typeof(saveUserKeyboardPref) != 'undefined'){
                    saveUserKeyboardPref('qwerty');
                }
                break;
            case 'num':
                __$('keyboard').innerHTML = getNumericKeyboard();
                break;
            case 'char':
                __$('keyboard').innerHTML = getPreferredKeyboard();
                if (typeof(saveUserKeyboardPref) != 'undefined'){
                    saveUserKeyboardPref('abc');
                }
                break;
            case 'date':
                getDatePicker();
                break;
            case 'SHIFT':
                toggleShift();
                break;
            case 'Unknown':
                inputTarget.value = "Unknown";
                break;

            default:
                if (tstShiftPressed) pressedChar = pressedChar.toUpperCase();
                inputTarget.value += pressedChar;
        }
    }

    if(doListSuggestions){
        listSuggestions(inputTargetPageNumber);
    }

    tstLastPressTime = new Date();
}