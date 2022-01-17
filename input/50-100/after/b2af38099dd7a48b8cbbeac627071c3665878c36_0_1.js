function() {
		    var resourceList = ResourceManager.getKeyList();
		    
		    // create a new Store for the list elements
		    var resStore = new Memory({
		        data: []
		    });
		    // Add all Resources to the list
		    for (var index in resourceList) {
		        resStore.put({name: resourceList[index], label: "<img class='comboBoxImage' src='' style='background:url(" + ResourceManager.getResourceUrl(resourceList[index]) + "); background-size: contain; background-repeat:no-repeat;' /><span class='comboBoxText'>" + resourceList[index] + "</span>"});
		    }
		    // Update the store of the combobox
 			this.comboBox.attr('store', resStore);
 			
	        
		}