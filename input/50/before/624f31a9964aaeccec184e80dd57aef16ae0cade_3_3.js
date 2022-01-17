function(editor, keyCode){
      // console.log("pressed", keyCode);
      switch(keyCode){
      case 13: // enter
        return pressedEnter(editor, this);
      default: // handle keyCombos
        this.prototype.pressed.apply(this, [keyCode]);
      }
    }