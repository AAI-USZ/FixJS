function(opts, elems){
       var elems = elems || "body";
       $.extend(this.options, opts);

       if( this.options.class_prefix == "") {
         this.options.class_prefix = "set_in_";
       }

       var stack = $(elems).css('font-family');
       // If a css-style font-family declaration (string) passed in, convert to array
       if (typeof stack == "string") {
         stack = stack.match(/[^'",;\s][^'",;]*/g) || [];
       }
       this.analyzeStack(stack, elems);
     }