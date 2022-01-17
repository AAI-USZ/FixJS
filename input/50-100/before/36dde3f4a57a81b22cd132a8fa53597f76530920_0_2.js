function(){
      try{
        var headtg = document.getElementsByTagName('head')[0];
        if (!headtg) {
          return;
        }
        var linktg = document.createElement('link');
        linktg.type = 'text/css';
        linktg.rel = 'stylesheet';
        linktg.href = './app/app_opaque.css';
        headtg.appendChild(linktg);
      }catch(e){
        Utils.debug("Problem loading the opaque");
      }
    }