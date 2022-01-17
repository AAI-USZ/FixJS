function(event, ui) {
					var $panel = $(ui.panel);
					var $container = $panel.closest('.tabMenuContainer');
					
					// store currently selected item
					if ($container.data('store')) {
						if ($.wcfIsset($container.data('store'))) {
							$('#' + $container.data('store')).attr('value', $panel.attr('id'));
						}
					}
					
					// set panel id as location hash
					if (WCF.TabMenu._didInit) {
						location.hash = '#' + $panel.attr('id');
					}
					
					$container.trigger('tabsselect', event, ui);
				}