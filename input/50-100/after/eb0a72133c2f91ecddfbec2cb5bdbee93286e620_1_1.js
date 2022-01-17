function(obj) {
    this.currentObject = obj;
    if(this.viewer)
    {
      var csg = OpenJsCad.Processor.convertToSolid(obj); 
      this.viewer.setCsg(csg);
    }
    this.hasValidCurrentObject = true;
    var ext = this.extensionForCurrentObject();
    this.generateOutputFileButton.innerHTML = "Generate "+ext.toUpperCase();
  }