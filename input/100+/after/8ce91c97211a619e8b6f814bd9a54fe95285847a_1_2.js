function(event) {
						var instance = this;

						var paginatorData = event.paginator;

						if (paginatorData) {
							if (event.src == SRC_SEARCH) {
								var repositoriesData = instance._repositoriesData;

								var repositoryData = repositoriesData[event.repositoryId];

								if (!repositoryData) {
									repositoryData = {};

									instance._repositoriesData[event.repositoryId] = repositoryData;
								}

								repositoryData.paginatorData = paginatorData;

								instance._pageNavigation._setPaginatorData(paginatorData);
							}
							else {
								instance._pageNavigation._setPaginatorData(paginatorData);
							}

							instance._toggleSyncNotification();
						}
					}