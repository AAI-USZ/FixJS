function() {
						var instance = this;

						Liferay.SchedulerEvent.superclass.syncNodeColorUI.apply(instance, arguments);

						var node = instance.get('node');
						var scheduler = instance.get('scheduler');

						if (scheduler) {
							var activeViewName = scheduler.get('activeView').get('name');

							if ((activeViewName === 'month') && !instance.get('allDay')) {
								node.setStyles(
									{
										backgroundColor: '#f8f8f8',
										border: 'none',
										color: instance.get('color')
									}
								);
							}
						}
					}