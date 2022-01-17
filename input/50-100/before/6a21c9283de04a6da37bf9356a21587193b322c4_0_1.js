function(e) {

      new Event(e).stop();

      if (this.options.method == 'html4')
      {
        this.addFiles([{
          name: this.getInputFileName(this.lastinput, subcontainer),
          type: null,
          size: null
        }], subcontainer);

      }
      else
      {
        this.addFiles(this.lastinput.files, subcontainer);
      }

    }