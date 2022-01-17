function(src) {
        var dest = targetConfig.dest+'/'+src.replace(basePath,"");
        copy(src, dest);
      }