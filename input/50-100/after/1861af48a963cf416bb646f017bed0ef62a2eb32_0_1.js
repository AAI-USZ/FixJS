function(oData){

			try {
			
				oTabs = oData.tabs;
				$.merge(items, responseToItems(oData, {section: 'stash', page: parseInt(oTabs[oData.tabIndex].n) }))

			} catch (e) {

				$.unblockUI();
				$('#err').html('An error occured while requesting data from pathofexile.com. Please ' +
							   'click refresh data to try again. If the error persists, contact the author.');
				console.log('Error while fetching from pathofexile.com - try clicking "Refresh Data"');
				errorDump(e);
			}				

		}