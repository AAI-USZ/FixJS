function(process, type, stat) {
      var idx = process + '_' + type + '_' + stat;
      for(var i = 0; i < my.json.board.stack.length; i ++) {
        if(my.json.board.stack[i] === idx) {
          my.json.board.stack.splice(i, 1);
          break;
        }
      }
      delete my.json.board[idx]; 
      that.refresh();
    }