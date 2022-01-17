function(value) {
  $("#model-select option[value='"+value+"']").attr('selected',true);
  
  
  
  this.currentModel = planetPresets[value];
  
  if(this.currentModel.model) {
    this.currentPlanet = planetPresets;
    this.planetSelect.hide();
    this.presetSelect.hide();      
    this.loadPreset(value);
    return;
  }
  
  UI.optionsFromHash("#planet-select", this.currentModel);
  this.planetSelect.show();
  for(var i in this.currentModel) {
    if(i=="caption") continue;
    this.loadPlanet(i);
    break;
  }
    
}