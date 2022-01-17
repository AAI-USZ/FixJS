function(preset) {
     
  // switch model
  this.currentPreset = preset;
  var planet = this.currentPlanet[preset];
  this.setPreset(planet);  
}