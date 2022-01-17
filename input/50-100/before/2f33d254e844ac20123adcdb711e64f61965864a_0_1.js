function () {
				var $backButton = (!!Ui.currentPage)
									? Util.getElementFromCache('#'+Ui.currentPage[0].id+' button.back')
									: z('section.active_page').find('button.back');					
				if ($backButton.length) {
					$backButton.trigger(TAP);
				}				
			}