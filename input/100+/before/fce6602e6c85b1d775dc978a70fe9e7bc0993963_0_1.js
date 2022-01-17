function(indicator, attribute, title, visible) {
	  var self = this;
	  if(indicator == "District revenues") {
          self.map.showLayer(self.stylelayers["Mines"].guid, false);
          self.map.showLayer(self.stylelayers["Oil wells"].guid, false);	      
          self.map.showLayer(self.stylelayers["District revenues"].guid, true);
	  }
	  else {
          self.map.showLayer(self.stylelayers["District revenues"].guid, false);
          self.map.showLayer(self.stylelayers["Mines"].guid, true);
          self.map.showLayer(self.stylelayers["Oil wells"].guid, true);	      
	  }
      
      var s_attr = F1.WorldBank.extractives[indicator]
	  if(attribute == "Icons"){
        self.map.addLayerCategoryFilter(self.stylelayers[indicator].guid, F1.WorldBank.extractives[indicator]["Icons"]);
	  } else {
    	  s_attr = F1.WorldBank.extractives[indicator][attribute];
    	  // s_attr.icon.selectedAttribute = attribute;
	      self.map.setLayerStyle(self.stylelayers[indicator].guid, s_attr);
	  }
	  // self.map.setLayerInfoWindow(self.stylelayers[indicator].guid, {
	  //       title: F1.WorldBank.extractives[indicator]["infoWindowFilter"]["title"], 
	  //       subtitle: s_attr["infoWindowFilter"]["subtitle"], tabs: F1.WorldBank.extractives[indicator]["infoWindowFilter"]["tabs"]});
	  jq('#layercontrol_extractives').html(title);
	  return false;
	}