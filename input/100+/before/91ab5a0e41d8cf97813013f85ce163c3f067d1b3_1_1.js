function(i){
          var css = el.opt.direction == "h" ? {display:"inline-block", width:$el.outerWidth()} : {display:"block", height:$el.outerHeight()};
          $(this).css(css).attr("data-idx",i);
          el.container.append($(this));
        }