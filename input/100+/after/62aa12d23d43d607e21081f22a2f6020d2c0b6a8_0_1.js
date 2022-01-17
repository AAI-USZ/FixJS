function(event){
    if (me.element.readOnly) {
      return true;
    }
    //THIS FUNCTION HANDLE BACKSPACE AND DELETE KEYS
    if (me.validate == 'Any' && me.mask == '') return true;
    //pressKey = event.keyCode;
    pressKey = window.event ? window.event.keyCode : event.which;
    
    switch(pressKey){
      case 8: case 46:  //BACKSPACE OR DELETE
      case 35: case 36: //HOME OR END
      case 37: case 38: case 39: case 40: // ARROW KEYS
        me.applyMask(pressKey);
        if ((pressKey == 8 || pressKey == 46) && (me.validate != 'Login' && me.validate != 'NodeName')) me.sendOnChange();
        me.checkBrowser();
        if (me.browser.name == 'Chrome' || me.browser.name == 'Safari'){
          event.returnValue = false;
        }
        else{
          return false;
        }
        break;
      case 9:
        return true;
        break;
      default:
        if (me.mType == 'date' || me.mType == 'currency' || me.mType == 'percentage' || me.validate == 'Real' || me.validate == 'Int') {
          if ((48 <= pressKey && pressKey <= 57) || (pressKey == 109 || pressKey == 190 || pressKey == 188) || (96 <= pressKey && pressKey <= 111)) {
            return true;
          }
          else {
            return false;
          }
        }
        break;
    }
    return true;
  }