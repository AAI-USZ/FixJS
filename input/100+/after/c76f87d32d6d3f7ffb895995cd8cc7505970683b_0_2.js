function(e) {
      Utils.debug("Recieved a drop event ");
      if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
      }
      if (e.preventDefault) {
        e.preventDefault(); 
      }      
      this.classList.remove('halfopacity');
      //Use the terminal to put the file into the file system
      window.appView.term.addDroppedFiles(e.dataTransfer.files);
      window.appView.term.output('<div>File(s) added!</div>');
      var audio = $(this);
      audio.empty();
      //http://stackoverflow.com/questions/7953593/change-source-to-audio-html5-element
      var newSrc = $("<source>").attr("src", "filesystem:" + window.location.origin +"/temporary/"+e.dataTransfer.files[0].name).appendTo(audio);
      /****************/
      audio.pause();
      audio.load();//suspends and restores all audio element
      /****************/
      return false;
    }