function(el, id, offset) {
      var og_size = {
        left: $(el).position().left,
        top: $(el).position().top,
        width: $(el).width(),
        height: $(el).height()
      };

      if(_letterBoxed) {
        el.style.width = og_size.width + 800 + "px";
        el.style.left = "-800px";
        el.style.height = og_size.height + 600 + "px";
        el.style.top = "-600px";

        setTimeout(function(){
          console.log(og_size);
          el.style.top = og_size.top + "px";
          el.style.left = og_size.left + "px";
          el.style.width = "100%";
          el.style.height = "100%";
        },500);
      }

      if (id) {
        el.loadVideoById(id, offset);
      }
    }