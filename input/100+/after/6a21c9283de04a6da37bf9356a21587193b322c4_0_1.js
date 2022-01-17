function(e) {
      e.stop();
	  
	  // Check out select max files
	  if (this.options.maxfiles && this.countStats().checked >= this.options.maxfiles)
	  {
		  this.fireEvent('onSelectError', ['maxfiles', this.filelist[this.filelist.length - 1].name, this.filelist[this.filelist.length - 1].size]);
		  
		  if (this.options.texts.maxselect.length > 0)
		  {			
			alert(this.options.texts.maxselect.substitute(this.options));			  			 		
			return false;
		  }
	  }

      // Click trigger for input[type=file] only works in FF 4.x, IE and Chrome
      this.lastinput.click();

      this.progressIni(document.id(subcontainer_id+'_progresscont'));

    }