function(elem , options) {
      if(elem instanceof jQuery){
        elem = $(elem).get(0);
      }
      
      /**
       * default Options
       */
      var defaults = {
        skelton : true ,
        exclude_class : ["lesskel_selected"],
      };

      var opts = $.extend(defaults, options);
      var lessObj = makeLessObj(elem , null , opts);
      less_src = generate(lessObj , opts);
      return less_src;
    }