function(idx){
        var el = $(this);
        el.css(dimension, funcArg(this, value, idx, el[dimension]()));
      }