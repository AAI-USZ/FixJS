function(oData){
			
			oTabs = oData.tabs;
			$.merge(items, responseToItems(oData, {section: 'stash', page: parseInt(oTabs[oData.tabIndex].n) }))

		}