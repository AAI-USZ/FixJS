function(preset) {

  // unload view
  if(this.model)
      this.view.cleanUp();
      
  // switch model
  this.currentPreset = preset;
  var planet = this.currentPlanet[preset];
  this.model = this.getModel(planet.model);
  this.setCurrentScene(this.model.root);
  // 
  this.model.setPreset(planet.params);
  
  
  // load text
  this.updateText(planet.text || (preset + ".html") );
        
  // load view
  this.view = this.getViewByName(planet.view);
  this.view.setPreset(this.model, planet.viewParams);
  this.updateUI();
  // change view?

  
}