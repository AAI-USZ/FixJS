function() {
    var vault = this.getVault();

    var text = prompt(APP_STRINGS.EN.CUSTOM_NEW, this.model.name + '1');
    if( text && 
        (!vault.custom[text] || confirm('Preset "' + text + '" already exists. Overwrite?'))) {
        
      var store = this.model.getPreset();
      store.caption = text;
      store.view = this.getView().name;
      if( !vault.custom[text] ) 
          localStorage["presetCount"] = Number(localStorage["presetCount"]) + 1;      
          
      vault.custom[text] = store;
      localStorage.setJson("customPresets", vault);

      this.loadCustomPresets();
      this.loadModel("custom"); 
      this.loadPlanet(text);
    }
}