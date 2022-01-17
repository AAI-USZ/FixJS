function(event) {
						var instance = this;

						var paginatorData = event.paginator;

						if (paginatorData) {
							instance._pageNavigation._setPaginatorData(paginatorData);
						}
					}