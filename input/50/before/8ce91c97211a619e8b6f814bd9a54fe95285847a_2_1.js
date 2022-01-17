function(event) {
						var instance = this;

						var paginatorData = event.paginator;

						if (paginatorData) {
							instance._paginatorAjaxNavigation._setPaginatorData(paginatorData);
						}
					}