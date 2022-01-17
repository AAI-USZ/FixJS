function(event) {
						var instance = this;

						var tabSection = event.tabSection;

						var searchResultsWrapper = tabSection.one('[data-repositoryId]');

						var repositoryId = searchResultsWrapper.attr('data-repositoryId');

						var repositoryData = instance._repositoriesData[repositoryId];

						if (repositoryData) {
							var paginatorData = repositoryData.paginatorData;

							if (paginatorData) {
								instance._pageNavigation._setPaginatorData(paginatorData);
							}
						}

						if (!searchResultsWrapper.hasAttribute(STR_DATA_SEARCH_PROCESSED)) {
							searchResultsWrapper.setAttribute(STR_DATA_SEARCH_PROCESSED, true);

							var selectedFolder = instance._selectAjaxNavigation._getSelectedFolder();

							var searchData = {
								folderId: selectedFolder.id,
								keywords: instance._keywordsNode.get('value'),
								repositoryId: selectedFolder.repositoryId,
								searchFolderId: DEFAULT_FOLDER_ID,
								searchRepositoryId: repositoryId
							};

							instance._searchFileEntry(searchData);
						}
						else {
							instance._documentLibraryContainer.all('.document-entries-paginator').show();
						}
					}