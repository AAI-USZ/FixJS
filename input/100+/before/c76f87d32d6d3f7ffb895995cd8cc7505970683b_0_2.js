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
      this.value = e.dataTransfer.files[0].name;
//      self.model.set("filename",e.dataTransfer.files[0].name);
      alert("Audio file was copied! (click on play button to listen)");
      return false;
    }