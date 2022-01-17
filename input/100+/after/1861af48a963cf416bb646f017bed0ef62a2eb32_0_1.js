function(){

			try {

				for (var i=0; i < numTabs; i++ ) {
					$('#refreshTabs').append('<li><label class="checkbox"><input type="checkbox" name="refreshTabs" value="stash-' + league + '-' + i + '">Tab:' + parseInt(oTabs[i].n) + '</label></li>');
				}

				for (var i=1; i < numTabs; i++ ) {		
					loadQueue.addPromise(
						getStashPage(league,i).done(function(oData){													
							$.merge(items, responseToItems(oData, {section: 'stash', page: parseInt(oTabs[oData.tabIndex].n) }))
						})
					);
				}

				loadQueue.completed(function(){
					processItems(items);
					$.unblockUI();
				})

				loadQueue.failed(function(){		
					$('#err').html('An error occured while requesting data from pathofexile.com. Please ' +
								   'click refresh data to try again. If the error persists, contact the author.');
					console.log('Error while fetching from pathofexile.com - try clicking "Refresh Data"');
					$.unblockUI();
				})

			} catch (e) {

				$.unblockUI();
				$('#err').html('An error occured while requesting data from pathofexile.com. Please ' +
							   'click refresh data to try again. If the error persists, contact the author.');
				console.log('Error while fetching from pathofexile.com - try clicking "Refresh Data"');
				errorDump(e);
			}

		}