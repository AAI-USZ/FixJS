function(i){
          var wrapper = $("<div/>").addClass("pageContent");
          $(this).wrapInner(wrapper);

          var css = el.opt.direction == "h" ? {display:"inline-block", width:$el.outerWidth()} : {display:"block", height:$el.outerHeight()};
          $(this).css(css).attr("data-idx",i);
          el.container.append($(this));
          this.content = $(".pageContent",$(this)).get(0);
        }