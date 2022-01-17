function(stack, elems) {
       var generics = ["monospace", "sans-serif", "serif", "cursive", "fantasy"];
       var baseline = generics[0];
       var num_fonts = stack.length;
       var last_resort = stack[num_fonts -1];

      // If author hasn't included a generic (tsk, tsk), let's add one
      if ($.inArray(last_resort, generics)) {
        stack.push(baseline);
        num_fonts++;
      }

      // If the generic is the same as our baseline, let's use another.
      if (last_resort == baseline) {
        baseline = generics[1];
      };

      // At this point we're sure there is a generic fallback font, so we'll only iterate though the non-generics.
      for (var i=0; i<num_fonts -1; i++) {
        font = stack[i];
        if ($.fontunstack.testFont(font, baseline)) {

          // Remove any class that has our prefix to prevent doubles.
          var re = new RegExp("\\b" + this.options.prefix + ".*?\\b","g");
          $(elems).get(0).className = $(elems).get(0).className.replace(re, "");

          // This should convert UTF8 to lowercase ANSI, removing all punctuation/spaces, but regexp scares me.
          safe_font_name = encodeURIComponent( font.replace( /[\s\-.!~*'()"]/g, "").toLowerCase() );
          $(elems).addClass(this.options.prefix + safe_font_name);
          break; //We only want to find one installed font per stack.
        }
      }
    }