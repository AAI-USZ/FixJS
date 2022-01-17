function(){
		if(confirm(strbundle.getString("alertPresetRestore"))){
			var path = eqpresets.getFilePathInProfile("equalizer_presets.xml");
			
			//Write settings file
			var presets = eqpresets.getDefaultPresets();
				
			// creation of DOM parser
			var parser = Components.classes["@mozilla.org/xmlextras/domparser;1"]
						.createInstance(Components.interfaces.nsIDOMParser);
				
			// création of file content
			var datas = eqpresets.createXMLString(presets);
			
			//create DOM document
			var DOMDoc = parser.parseFromString(datas,"text/xml");
				
			//Save it in ProfD
			eqpresets.saveXMLDocument(DOMDoc,path);
			
			//reload list
			eqpresets.loadList();
		
		}
	}