function(preset) {
  // unload view
  if(this.model)
      this.view.cleanUp();
      
  // switch model
  this.setModel( this.getModelById(preset.model) );
  this.model.setPreset(preset.params);
  // load text
  this.updateText(preset.text); // || (preset + ".html") );
        
  // load view
  this.view = this.getViewByName(preset.view);
  this.view.setPreset(this.model, preset.viewParams);
  this.updateUI();
  // change view?

}