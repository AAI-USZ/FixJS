function(editor, keyCode){
      this.prototype.pressed.apply(this, [editor, keyCode]);
      switch(keyCode){
      case 13: // enter
        return pressedEnter(editor, editor.preview);
      case 8: // Backspace
        return pressedBackspace(editor, editor.preview);
      case 46: // Delete
        return pressedDelete(editor, editor.preview);
      case 37: // left arrow
        return checkCaret(-1);
      case 39: // right arrow
        return checkCaret(1);
      default:
        return checkIfDeletedAll(editor.preview, keyCode, this.holdNeutralKey);
      }
    }