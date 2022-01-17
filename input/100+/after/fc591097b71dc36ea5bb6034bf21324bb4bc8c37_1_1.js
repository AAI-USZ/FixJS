function (cells, i){
      if (!head.length && i == 0)
        lineTop();
      else {
        if (!style.compact || i<(!!head.length) ?1:0 || cells.length == 0){
          line(chars.mid
             , chars['left-mid']
             , chars['right-mid']
             , chars['mid-mid']);
             
          ret += "\n" 
        }
      }

      if (cells.hasOwnProperty("length") && !cells.length)
        return

      if (cells.hasOwnProperty("length")) {
        ret += chars.left;

        cells.forEach(function(cell, i){
          ret += string(cell, i);
          ret += chars.right;
        });

        ret += "\n";
      } else if (typeof cells === 'object') {
        var key = Object.keys(cells)[0]
          , value = cells[key];

        if (style.head){
          style.head.forEach(function(style){
            key = key[style];
          });
        }

        ret += chars.left + string(key, 0) + chars.right +
               string(value, 1) + chars.right + "\n"
      }
    }