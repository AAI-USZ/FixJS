function() {
						var instance = this;

						if (instance._syncMessage) {
							var entryPaginator = instance._paginatorAjaxNavigation.getEntryPaginator()

							var entriesPaginatorState = entryPaginator.get('state');

							var syncMessageBoundingBox = instance._syncMessage.get('boundingBox');

							syncMessageBoundingBox.toggleClass(CSS_SYNC_MESSAGE_HIDDEN, entriesPaginatorState.total <= 0);
						}
					}