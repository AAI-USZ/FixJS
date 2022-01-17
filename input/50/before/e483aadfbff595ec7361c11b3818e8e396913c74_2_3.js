function(callback){
      if (readyRE.test(document.readyState)) callback($);
      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false);
      return this;
    }